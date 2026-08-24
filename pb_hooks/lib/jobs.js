/** Минуты бэкоффа по номеру попытки (1-based). */
var BACKOFF_MINUTES = [1, 2, 5, 15, 60]

var JOB_STATUS = {
  QUEUED: "queued",
  RUNNING: "running",
  DONE: "done",
  ERROR: "error",
}

var SEND_KINDS = ["send_order", "resend_order"]
var SYNC_KINDS = ["sync_products", "sync_stops"]

var MAX_SEND_PER_TICK = 2
var MAX_SYNC_PER_TICK = 1
var PURGE_AFTER_DAYS = 7

function formatPbDateTime(d) {
  var config = require(__hooks + "/lib/config.js")
  return config.toPbDateTime(d)
}

/**
 * @param {number} attempts
 * @returns {number}
 */
function backoffMinutes(attempts) {
  var idx = attempts - 1
  if (idx < 0) {
    idx = 0
  }
  if (idx >= BACKOFF_MINUTES.length) {
    return BACKOFF_MINUTES[BACKOFF_MINUTES.length - 1]
  }
  return BACKOFF_MINUTES[idx]
}

function parseUpdatedMs(record) {
  var config = require(__hooks + "/lib/config.js")
  var ms = config.parsePbDateTimeMs(config.readPbDateTime(record, "updated"))
  return ms === null ? 0 : ms
}

/**
 * @param {Object} record
 * @returns {boolean}
 */
function isJobReady(record) {
  var attempts = record.getFloat("attempts") || 0
  if (attempts <= 0) {
    return true
  }
  var waitMs = backoffMinutes(attempts) * 60 * 1000
  return Date.now() >= parseUpdatedMs(record) + waitMs
}

function recordToJob(record) {
  var config = require(__hooks + "/lib/config.js")
  return {
    id: record.id,
    kind: record.getString("kind"),
    status: record.getString("status"),
    attempts: record.getFloat("attempts") || 0,
    payload: config.parseJsonField(record.get("payload"), {}),
    error: record.getString("error") || "",
  }
}

function buildKindFilter(kinds) {
  var parts = []
  for (var i = 0; i < kinds.length; i++) {
    parts.push('kind = "' + kinds[i] + '"')
  }
  return "(" + parts.join(" || ") + ') && status = "' + JOB_STATUS.QUEUED + '"'
}

/**
 * @param {string} kind
 * @param {Object} [payload]
 * @returns {string} job id
 */
function enqueueJob(kind, payload) {
  var collection = $app.findCollectionByNameOrId("frontpad_jobs")
  var job = new Record(collection)
  job.set("kind", kind)
  job.set("payload", payload || {})
  job.set("status", JOB_STATUS.QUEUED)
  job.set("attempts", 0)
  job.set("error", "")
  $app.save(job)
  return job.id
}

/**
 * @param {string|string[]} kindOrKinds
 * @returns {Object|null}
 */
function claimNextJob(kindOrKinds) {
  var kinds = typeof kindOrKinds === "string" ? [kindOrKinds] : kindOrKinds
  var records = $app.findRecordsByFilter(
    "frontpad_jobs",
    buildKindFilter(kinds),
    "created",
    50,
    0,
  )

  for (var i = 0; i < records.length; i++) {
    var candidate = records[i]
    if (!isJobReady(candidate)) {
      continue
    }

    var claimed = null
    // txApp обязателен: внешний $app внутри транзакции идёт по другому
    // соединению и блокируется на write-lock этой же транзакции.
    $app.runInTransaction(function (txApp) {
      var fresh = txApp.findRecordById("frontpad_jobs", candidate.id)
      if (fresh.getString("status") !== JOB_STATUS.QUEUED) {
        return
      }
      if (!isJobReady(fresh)) {
        return
      }
      var attempts = fresh.getFloat("attempts") || 0
      fresh.set("status", JOB_STATUS.RUNNING)
      fresh.set("attempts", attempts + 1)
      fresh.set("error", "")
      txApp.save(fresh)
      claimed = fresh
    })

    if (claimed) {
      return recordToJob(claimed)
    }
  }

  return null
}

/**
 * @param {string} jobId
 * @param {Object} [result]
 */
function completeJob(jobId, result) {
  var record = $app.findRecordById("frontpad_jobs", jobId)
  record.set("status", JOB_STATUS.DONE)
  record.set("error", "")
  if (result !== undefined) {
    record.set("result", result)
  }
  $app.save(record)
}

function patchOrderError(orderId, errorMessage) {
  try {
    var order = $app.findRecordById("orders", orderId)
    order.set("frontpadError", errorMessage)
    $app.save(order)
  } catch (err) {
    // order may be deleted
  }
}

/**
 * @param {string} jobId
 * @param {string} errorMessage
 * @param {Object} [options]
 */
function failJob(jobId, errorMessage, options) {
  var config = require(__hooks + "/lib/config.js")
  var fpSettings = config.loadFrontpadSettings()
  var retryLimit = fpSettings.retryLimit || 5

  var record = $app.findRecordById("frontpad_jobs", jobId)
  var attempts = record.getFloat("attempts") || 0
  var kind = record.getString("kind")
  var payload = config.parseJsonField(record.get("payload"), {})
  var msg = errorMessage || "Ошибка выполнения"

  if (attempts > retryLimit) {
    record.set("status", JOB_STATUS.ERROR)
    record.set("error", msg)
    $app.save(record)

    if (payload.orderId && (kind === "send_order" || kind === "resend_order")) {
      patchOrderError(payload.orderId, msg)
    }
    return
  }

  record.set("status", JOB_STATUS.QUEUED)
  record.set("error", msg)
  $app.save(record)
}

function processSendJob(job) {
  var send = require(__hooks + "/lib/send.js")
  var orderId = job.payload && job.payload.orderId

  if (!orderId) {
    failJob(job.id, "Нет orderId в payload")
    return
  }

  try {
    // resend_order ставится вручную из админки — метка sentAt не должна его блокировать,
    // защитой от дублей остаётся заполненный frontpadOrderId
    var result = send.sendOrder(orderId, {
      noEnqueue: true,
      force: job.kind === "resend_order",
    })

    if (result.sent || result.skipped || result.dryRun) {
      completeJob(job.id, result)
      return
    }

    if (result.retryable) {
      failJob(job.id, result.error || "Ошибка отправки в кассу")
      return
    }

    completeJob(job.id, { error: result.error || "Ошибка отправки" })
  } catch (err) {
    failJob(job.id, String(err))
  }
}

function processSyncJob(job) {
  var sync = require(__hooks + "/lib/sync.js")
  var outcome = null

  try {
    if (job.kind === "sync_products") {
      outcome = sync.syncProducts()
    } else if (job.kind === "sync_stops") {
      outcome = sync.syncStops()
    } else {
      failJob(job.id, "Неизвестный kind синхронизации: " + job.kind)
      return
    }

    if (outcome && outcome.ok) {
      completeJob(job.id, outcome)
      return
    }

    if (outcome && outcome.skipped) {
      completeJob(job.id, outcome)
      return
    }

    failJob(job.id, (outcome && outcome.error) || "Ошибка синхронизации")
  } catch (err) {
    failJob(job.id, String(err))
  }
}

/**
 * Немедленный прогон одного джоба (кнопка «Переотправить» в админке).
 * Возвращает false, если джоб уже забрал кто-то другой.
 *
 * @param {string} jobId
 * @returns {boolean}
 */
function runJobById(jobId) {
  var config = require(__hooks + "/lib/config.js")
  var claimed = null

  $app.runInTransaction(function (txApp) {
    var fresh = txApp.findRecordById("frontpad_jobs", jobId)
    if (fresh.getString("status") !== JOB_STATUS.QUEUED) {
      return
    }
    var payload = config.parseJsonField(fresh.get("payload"), {})
    if (payload && payload.auto) {
      return
    }
    fresh.set("status", JOB_STATUS.RUNNING)
    fresh.set("attempts", (fresh.getFloat("attempts") || 0) + 1)
    fresh.set("error", "")
    txApp.save(fresh)
    claimed = fresh
  })

  if (!claimed) {
    return false
  }

  var job = recordToJob(claimed)
  if (job.kind === "send_order" || job.kind === "resend_order") {
    processSendJob(job)
  } else {
    processSyncJob(job)
  }
  return true
}

function recoverStaleRunningJobs() {
  var cutoff = new Date(Date.now() - 5 * 60 * 1000)
  var cutoffStr = formatPbDateTime(cutoff)
  var records = $app.findRecordsByFilter(
    "frontpad_jobs",
    'status = "' + JOB_STATUS.RUNNING + '" && updated < {:cutoff}',
    "-updated",
    50,
    0,
    { cutoff: cutoffStr },
  )

  for (var i = 0; i < records.length; i++) {
    var record = records[i]
    record.set("status", JOB_STATUS.QUEUED)
    record.set("error", "Сброшено: зависло в running")
    $app.save(record)
  }
}

/** Cron-воркер: ≤2 отправки и ≤1 синхронизация за тик. */
function runWorkerTick() {
  recoverStaleRunningJobs()

  var sendCount = 0
  while (sendCount < MAX_SEND_PER_TICK) {
    var sendJob = claimNextJob(SEND_KINDS)
    if (!sendJob) {
      break
    }
    processSendJob(sendJob)
    sendCount++
  }

  var syncCount = 0
  while (syncCount < MAX_SYNC_PER_TICK) {
    var syncJob = claimNextJob(SYNC_KINDS)
    if (!syncJob) {
      break
    }
    processSyncJob(syncJob)
    syncCount++
  }
}

/** Удаление завершённых джобов старше 7 дней. */
function purgeOldJobs() {
  var cutoff = new Date(Date.now() - PURGE_AFTER_DAYS * 24 * 60 * 60 * 1000)
  var cutoffStr = formatPbDateTime(cutoff)
  var records = $app.findRecordsByFilter(
    "frontpad_jobs",
    'status = "' + JOB_STATUS.DONE + '" && created < {:cutoff}',
    "-created",
    200,
    0,
    { cutoff: cutoffStr },
  )

  for (var i = 0; i < records.length; i++) {
    $app.delete(records[i])
  }
}

module.exports = {
  BACKOFF_MINUTES: BACKOFF_MINUTES,
  JOB_STATUS: JOB_STATUS,
  SEND_KINDS: SEND_KINDS,
  SYNC_KINDS: SYNC_KINDS,
  backoffMinutes: backoffMinutes,
  enqueueJob: enqueueJob,
  claimNextJob: claimNextJob,
  runJobById: runJobById,
  completeJob: completeJob,
  failJob: failJob,
  runWorkerTick: runWorkerTick,
  purgeOldJobs: purgeOldJobs,
}
