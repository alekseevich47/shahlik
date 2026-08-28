/**
 * VK ID (id.vk.ru) — OAuth 2.1 + PKCE + device_id.
 * Встроенный провайдер PocketBase `vk` — legacy oauth.vk.com, с VK ID не совместим.
 *
 * PKCE verifier кладём в зашифрованный `state` (VK его возвращает как есть).
 * Cookie между доменами часто теряется → «Сессия VK ID истекла».
 */

var PROVIDER = "vk"
var COLLECTION = "app_users"
var AUTH_URL = "https://id.vk.ru/authorize"
var TOKEN_URL = "https://id.vk.ru/oauth2/auth"
var USER_INFO_URL = "https://id.vk.ru/oauth2/user_info"
var STATE_TTL_MS = 10 * 60 * 1000
var PKCE_ALPHABET =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~"
var B64URL = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_"

function siteOrigin() {
  var fromEnv = $os.getenv("SITE_URL")
  if (fromEnv && String(fromEnv).length > 0) {
    return String(fromEnv).replace(/\/$/, "")
  }
  return "https://shashlik.loomixx.ru"
}

function callbackUrl() {
  return siteOrigin() + "/api/auth/vk/callback"
}

function cryptoKey() {
  var raw =
    $os.getenv("VK_OAUTH_COOKIE_KEY") ||
    $os.getenv("FRONTPAD_HOOK_TOKEN") ||
    ""
  if (!raw || String(raw).length < 16) {
    throw new BadRequestError(
      "Задайте FRONTPAD_HOOK_TOKEN или VK_OAUTH_COOKIE_KEY (≥16 символов) для VK ID",
    )
  }
  // AES-256-GCM в $security.encrypt требует ровно 32 символа.
  return $security.sha256(String(raw)).substring(0, 32)
}

function getVkCredentials() {
  var col = $app.findCollectionByNameOrId(COLLECTION)
  var oauth2 = col.oauth2
  if (!oauth2) {
    throw new BadRequestError("У app_users не включён OAuth2")
  }
  var providers = oauth2.providers || []
  for (var i = 0; i < providers.length; i++) {
    var p = providers[i]
    if (!p) continue
    var name = p.name || p.Name || ""
    var clientId = p.clientId || p.ClientId || ""
    var clientSecret = p.clientSecret || p.ClientSecret || ""
    if (name === PROVIDER && clientId) {
      return {
        clientId: String(clientId),
        clientSecret: clientSecret ? String(clientSecret) : "",
      }
    }
  }
  throw new BadRequestError(
    "В app_users нет OAuth2-провайдера vk с clientId (/_/ → коллекция → Options → OAuth2)",
  )
}

function hexToBytes(hex) {
  var out = []
  var s = String(hex)
  for (var i = 0; i + 1 < s.length; i += 2) {
    out.push(parseInt(s.substr(i, 2), 16))
  }
  return out
}

function bytesToBase64Url(bytes) {
  var out = ""
  for (var i = 0; i < bytes.length; i += 3) {
    var a = bytes[i]
    var b = i + 1 < bytes.length ? bytes[i + 1] : 0
    var c = i + 2 < bytes.length ? bytes[i + 2] : 0
    var n = (a << 16) | (b << 8) | c
    out += B64URL[(n >> 18) & 63]
    out += B64URL[(n >> 12) & 63]
    if (i + 1 < bytes.length) out += B64URL[(n >> 6) & 63]
    if (i + 2 < bytes.length) out += B64URL[n & 63]
  }
  return out
}

function toBase64Url(raw) {
  return String(raw)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "")
}

function fromBase64Url(raw) {
  var b64 = String(raw).replace(/-/g, "+").replace(/_/g, "/")
  while (b64.length % 4) {
    b64 += "="
  }
  return b64
}

function pkceChallenge(verifier) {
  return bytesToBase64Url(hexToBytes($security.sha256(verifier)))
}

/** state для VK: только [A-Za-z0-9_-], длина ≥ 32. */
function sealState(payload) {
  var enc = $security.encrypt(JSON.stringify(payload), cryptoKey())
  return toBase64Url(enc)
}

function unsealState(state) {
  if (!state || String(state).length < 32) {
    throw new BadRequestError("Пустой или короткий state от VK ID")
  }
  try {
    var json = $security.decrypt(fromBase64Url(state), cryptoKey())
    var data = JSON.parse(json)
    if (!data || !data.verifier) {
      throw new Error("no verifier")
    }
    if (data.exp && Date.now() > Number(data.exp)) {
      throw new BadRequestError("Сессия VK ID истекла — начните вход снова")
    }
    return data
  } catch (err) {
    if (err instanceof BadRequestError) throw err
    throw new BadRequestError("Не удалось проверить state VK ID — начните вход снова")
  }
}

function formEncode(params) {
  var parts = []
  for (var key in params) {
    if (!params.hasOwnProperty(key)) continue
    var value = params[key]
    if (value === undefined || value === null || value === "") continue
    parts.push(encodeURIComponent(key) + "=" + encodeURIComponent(String(value)))
  }
  return parts.join("&")
}

function queryValue(query, key) {
  if (!query) return ""
  var value = query[key]
  if (value === undefined || value === null) return ""
  if (typeof value === "object" && typeof value.length === "number") {
    return value.length ? String(value[0]) : ""
  }
  return String(value)
}

function parseCallbackParams(e) {
  var info = e.requestInfo()
  var q = (info && info.query) || {}
  var code = queryValue(q, "code")
  var state = queryValue(q, "state")
  var deviceId = queryValue(q, "device_id")
  var err = queryValue(q, "error")
  var errDesc = queryValue(q, "error_description")

  var payloadRaw = queryValue(q, "payload")
  if (payloadRaw) {
    try {
      var payload = JSON.parse(payloadRaw)
      if (payload.code) code = String(payload.code)
      if (payload.state) state = String(payload.state)
      if (payload.device_id) deviceId = String(payload.device_id)
      if (payload.error) err = String(payload.error)
      if (payload.error_description) errDesc = String(payload.error_description)
    } catch (parseErr) {
      throw new BadRequestError("Некорректный payload от VK ID")
    }
  }

  return {
    code: code,
    state: state,
    deviceId: deviceId,
    error: err,
    errorDescription: errDesc,
  }
}

function httpForm(url, params) {
  var response = $http.send({
    url: url,
    method: "POST",
    body: formEncode(params),
    headers: {
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
    },
    timeout: 15000,
  })
  if (!response || response.statusCode < 200 || response.statusCode >= 300) {
    var status = response ? response.statusCode : 0
    var snippet = response && response.raw ? String(response.raw).slice(0, 300) : ""
    throw new BadRequestError("VK ID HTTP " + status + (snippet ? ": " + snippet : ""))
  }
  return JSON.parse(response.raw)
}

function findExternalUser(providerId) {
  try {
    var ext = $app.findFirstRecordByFilter(
      "_externalAuths",
      "provider = {:p} && providerId = {:id}",
      { p: PROVIDER, id: String(providerId) },
    )
    return $app.findRecordById(COLLECTION, ext.getString("recordRef"))
  } catch (err) {
    return null
  }
}

function findOrCreateUser(vkUser, accessEmail) {
  var oauth = require(__hooks + "/lib/oauth.js")
  var providerId = String(vkUser.user_id || vkUser.id || "")
  if (!providerId) {
    throw new BadRequestError("VK ID не вернул user_id")
  }

  var payload = oauth.extractVkProfile(vkUser, accessEmail)

  var existing = findExternalUser(providerId)
  if (existing) {
    oauth.addEmailsToRecord(existing, payload.emails)
    oauth.applyNames(existing, payload.names, true)
    $app.save(existing)
    oauth.finalizeOAuthLogin($app, existing, payload)
    return $app.findRecordById(COLLECTION, existing.id)
  }

  var phone = oauth.normalizePhone(payload.phone)
  if (phone) {
    var byPhone = oauth.findAppUserByPhone($app, phone, "")
    if (byPhone) {
      linkExternal(byPhone, providerId)
      oauth.addEmailsToRecord(byPhone, payload.emails)
      oauth.applyNames(byPhone, payload.names, true)
      $app.save(byPhone)
      oauth.finalizeOAuthLogin($app, byPhone, payload)
      return $app.findRecordById(COLLECTION, byPhone.id)
    }
  }

  var email = payload.emails.length ? payload.emails[0] : ""
  if (email) {
    try {
      var byEmail = $app.findAuthRecordByEmail(COLLECTION, email)
      linkExternal(byEmail, providerId)
      oauth.addEmailsToRecord(byEmail, payload.emails)
      oauth.applyNames(byEmail, payload.names, true)
      $app.save(byEmail)
      oauth.finalizeOAuthLogin($app, byEmail, payload)
      return $app.findRecordById(COLLECTION, byEmail.id)
    } catch (err) {
      // нет записи с таким email
    }
  }

  var collection = $app.findCollectionByNameOrId(COLLECTION)
  var record = new Record(collection)
  if (email) {
    record.set("email", email)
  }
  oauth.addEmailsToRecord(record, payload.emails)
  record.set("emailVisibility", false)
  record.setVerified(true)
  var password = $security.randomString(24)
  record.setPassword(password)
  record.set("passwordConfirm", password)
  oauth.applyNames(record, payload.names, false)
  if (phone) {
    record.set("phone", phone)
  }
  $app.save(record)
  linkExternal(record, providerId)
  oauth.finalizeOAuthLogin($app, record, payload)
  return $app.findRecordById(COLLECTION, record.id)
}

function linkExternal(authRecord, providerId) {
  try {
    $app.findFirstRecordByFilter(
      "_externalAuths",
      "provider = {:p} && providerId = {:id}",
      { p: PROVIDER, id: String(providerId) },
    )
    return
  } catch (err) {
    // создаём связь
  }

  var extCol = $app.findCollectionByNameOrId("_externalAuths")
  var ext = new Record(extCol)
  ext.set("collectionRef", authRecord.collection().id)
  ext.set("recordRef", authRecord.id)
  ext.set("provider", PROVIDER)
  ext.set("providerId", String(providerId))
  $app.save(ext)
}

function redirectError(e, message) {
  var url =
    siteOrigin() +
    "/profile?auth_error=" +
    encodeURIComponent(message || "Не удалось войти через VK ID")
  return e.redirect(302, url)
}

function handleSession(e) {
  var verifier = $security.randomStringWithAlphabet(64, PKCE_ALPHABET)
  var redirectUri = callbackUrl()
  var challenge = pkceChallenge(verifier)
  var state = sealState({
    verifier: verifier,
    redirectUri: redirectUri,
    exp: Date.now() + STATE_TTL_MS,
  })

  return e.json(200, {
    state: state,
    codeChallenge: challenge,
  })
}

function handleStart(e) {
  try {
    var creds = getVkCredentials()
    var verifier = $security.randomStringWithAlphabet(64, PKCE_ALPHABET)
    var redirectUri = callbackUrl()
    var challenge = pkceChallenge(verifier)
    var state = sealState({
      verifier: verifier,
      redirectUri: redirectUri,
      exp: Date.now() + STATE_TTL_MS,
    })

    var url =
      AUTH_URL +
      "?response_type=code" +
      "&client_id=" +
      encodeURIComponent(creds.clientId) +
      "&redirect_uri=" +
      encodeURIComponent(redirectUri) +
      "&state=" +
      encodeURIComponent(state) +
      "&code_challenge=" +
      encodeURIComponent(challenge) +
      "&code_challenge_method=S256" +
      "&scope=" +
      encodeURIComponent("email phone") +
      "&lang_id=0"

    return e.redirect(302, url)
  } catch (err) {
    var msg = err && err.message ? String(err.message) : String(err)
    $app.logger().error("vkid start failed", "error", msg)
    throw new BadRequestError(msg)
  }
}

function handleCallback(e) {
  try {
    return handleCallbackInner(e)
  } catch (err) {
    var msg = err && err.message ? String(err.message) : String(err)
    $app.logger().error("vkid callback failed", "error", msg)
    return redirectError(e, msg)
  }
}

function exchangeAuthCode(code, deviceId, codeVerifier, stateParam) {
  var creds = getVkCredentials()
  var redirectUri = callbackUrl()

  var tokenBody = {
    grant_type: "authorization_code",
    code: String(code),
    code_verifier: String(codeVerifier),
    client_id: creds.clientId,
    device_id: String(deviceId),
    redirect_uri: redirectUri,
  }
  if (stateParam) {
    tokenBody.state = String(stateParam)
  }

  var serviceToken = $os.getenv("VK_ID_SERVICE_TOKEN") || ""
  if (serviceToken) {
    tokenBody.service_token = String(serviceToken)
  } else if (creds.clientSecret) {
    tokenBody.client_secret = creds.clientSecret
  }

  var tokenData = httpForm(TOKEN_URL, tokenBody)
  if (!tokenData || !tokenData.access_token) {
    throw new BadRequestError("VK ID не выдал access_token")
  }

  var userInfo = httpForm(USER_INFO_URL, {
    access_token: tokenData.access_token,
    client_id: creds.clientId,
  })

  var vkUser = (userInfo && userInfo.user) || userInfo || {}
  if (!vkUser.user_id && tokenData.user_id) {
    vkUser.user_id = tokenData.user_id
  }

  return vkUser
}

function sessionTokenFromVkUser(vkUser) {
  var record = findOrCreateUser(vkUser, vkUser.email || "")
  if (record.getBool("blocked")) {
    throw new BadRequestError("Аккаунт заблокирован")
  }
  return record.newAuthToken()
}

function readJsonBody(e) {
  try {
    var info = e.requestInfo()
    if (info && info.body && typeof info.body === "object") {
      return info.body
    }
  } catch (err) {
    // ignore
  }
  return {}
}

function handleCallbackInner(e) {
  var params = parseCallbackParams(e)
  if (params.error) {
    return redirectError(
      e,
      params.errorDescription || params.error || "VK ID отклонил вход",
    )
  }
  if (!params.code || !params.state || !params.deviceId) {
    return redirectError(e, "VK ID вернул неполный ответ (code/state/device_id)")
  }

  var stored
  try {
    stored = unsealState(params.state)
  } catch (err) {
    return redirectError(e, String(err.message || err))
  }

  var vkUser
  try {
    vkUser = exchangeAuthCode(
      params.code,
      params.deviceId,
      stored.verifier,
      params.state,
    )
  } catch (err) {
    return redirectError(e, String(err.message || err))
  }

  var token
  try {
    token = sessionTokenFromVkUser(vkUser)
  } catch (err) {
    return redirectError(e, String(err.message || err))
  }

  var finish =
    siteOrigin() + "/auth/callback?token=" + encodeURIComponent(token)
  return e.redirect(302, finish)
}

function handleComplete(e) {
  try {
    var body = readJsonBody(e)
    var code = String(body.code || "").trim()
    var deviceId = String(body.device_id || body.deviceId || "").trim()
    var codeVerifier = String(body.code_verifier || body.codeVerifier || "").trim()
    var stateParam = String(body.state || "").trim()

    if (!code || !deviceId) {
      throw new BadRequestError("Неполные данные VK ID (code/device_id)")
    }

    if (!codeVerifier && stateParam) {
      var stored = unsealState(stateParam)
      codeVerifier = String(stored.verifier || "").trim()
    }
    if (!codeVerifier) {
      throw new BadRequestError("Неполные данные VK ID (code_verifier/state)")
    }

    var vkUser = exchangeAuthCode(code, deviceId, codeVerifier, stateParam)
    var token = sessionTokenFromVkUser(vkUser)
    return e.json(200, { token: token })
  } catch (err) {
    var msg = err && err.message ? String(err.message) : String(err)
    $app.logger().error("vkid complete failed", "error", msg)
    throw new BadRequestError(msg)
  }
}

module.exports = {
  handleStart: handleStart,
  handleCallback: handleCallback,
  handleComplete: handleComplete,
  handleSession: handleSession,
}
