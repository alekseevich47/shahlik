import fs from "node:fs"

const s = fs.readFileSync("apps/shashlik-web/public/vk/vkid-sdk.js", "utf8")
const idx = s.indexOf('CLOSE="common: close"')
console.log(s.slice(idx, idx + 500))

const renderIdx = s.indexOf("OneTap.prototype.render")
console.log("\nrender:", s.slice(renderIdx, renderIdx + 800))
