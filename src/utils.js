const CryptoJS = require('crypto-js')
const key = CryptoJS.enc.Utf8.parse('1234123412ABCDEF')
const iv = CryptoJS.enc.Utf8.parse('9B7D5F12B419361C')

function Decrypt (word) {
  let encryptedHexStr = CryptoJS.enc.Hex.parse(word)
  let srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr)
  let decrypt = CryptoJS.AES.decrypt(srcs, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 })
  let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8)
  return decryptedStr.toString()
}
function Encrypt (word) {
  let srcs = CryptoJS.enc.Utf8.parse(word)
  let encrypted = CryptoJS.AES.encrypt(srcs, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 })
  return encrypted.ciphertext.toString().toUpperCase()
}
function EncryptSha1 (word) {
  let sha1 = CryptoJS.SHA1(word)
  let srcs = CryptoJS.enc.Utf8.parse(sha1)
  let encrypted = CryptoJS.AES.encrypt(srcs, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 })
  return encrypted.ciphertext.toString().toUpperCase()
}
function GetLiftRatioDefault (buffDefault, buffAtk, buffBurst, class1) {
  var ratio = 0
  const templateAtk = 2400
  const templateDefault = 3000
  if (class1 === '炽天使') {
    ratio =
      ((Number(buffDefault) * 1.3 +
        Number(buffBurst) +
        500 +
        templateDefault) *
        (Number(buffAtk) * 1.3 + templateAtk)) /
      (templateAtk * templateDefault)
  } else if (class1 === '神思者') {
    ratio =
      ((Number(buffDefault) +
        Number(buffBurst) +
        300 +
        templateDefault) *
        (Number(buffAtk) + templateAtk)) /
      (templateAtk * templateDefault)
  } else if (class1 === '冥月女神') {
    ratio =
      ((Number(buffDefault) * 1.25 * 1.075 +
        Number(buffBurst) +
        500 +
        templateDefault) *
        (Number(buffAtk) * 1.25 * 1.075 + templateAtk)) /
      (templateAtk * templateDefault)
  }
  return ratio.toFixed(2)
}
function GetLiftRatioBurst (buffDefault, buffAtk, buffBurst, class1) {
  var ratio = 0
  const templateAtk = 2400
  const templateDefault = 3000
  const systemBuff = 8000
  if (class1 === '炽天使') {
    ratio =
      ((Number(buffDefault) * 1.3 +
        Number(buffBurst) +
        500 +
        systemBuff +
        templateDefault) *
        (Number(buffAtk) * 1.3 + templateAtk)) /
      (templateAtk * (templateDefault + systemBuff))
  } else if (class1 === '神思者') {
    ratio =
      ((Number(buffDefault) +
        Number(buffBurst) +
        300 +
        systemBuff +
        templateDefault) *
        (Number(buffAtk) + templateAtk)) /
      (templateAtk * (templateDefault + systemBuff))
  } else if (class1 === '冥月女神') {
    ratio =
      ((Number(buffDefault) * 1.25 * 1.075 +
        Number(buffBurst) +
        500 +
        systemBuff +
        templateDefault) *
        (Number(buffAtk) * 1.25 * 1.075 + templateAtk)) /
      (templateAtk * (templateDefault + systemBuff))
  }
  return ratio.toFixed(2)
}
// 计算奶的提升率
function GetLiftRatio (buff, job, isSystemBuff, boost, favoritism) {
  var ratio = 0
  const buffStrInt = Number(buff.strInt)
  const buffAtk = Number(buff.atk)
  const buffBurst = Number(buff.burst)
  var systemBuff = 8000
  // 模板C的三攻力智
  const templateCharacter = {
    atk: 2400,
    strInt: 3000
  }
  var buffer = {
    boost: 1,
    favoritism: 1,
    aura: 0
  }
  if (!isSystemBuff) {
    systemBuff = 0
  }
  switch (job) {
    case '炽天使':
      buffer.boost = 1.3
      buffer.aura = 500
      break
    case '神思者':
      buffer.boost = 1
      buffer.aura = 300
      break
    case '冥月女神':
      buffer.boost = 1.25
      buffer.aura = 500
      buffer.favoritism = 1.15
      break
  }
  if (!boost) {
    buffer.boost = 1
  }
  if (!favoritism) {
    buffer.favoritism = 1
  }
  ratio =
    ((buffStrInt * buffer.boost * buffer.favoritism +
      buffBurst +
      buffer.aura +
      systemBuff +
      templateCharacter.strInt) *
      (buffAtk * buffer.boost * buffer.favoritism + templateCharacter.atk)) /
    (templateCharacter.atk * (templateCharacter.strInt + systemBuff))
  return Number(ratio.toFixed(2))
}
export default {
  Decrypt,
  Encrypt,
  EncryptSha1,
  GetLiftRatioDefault,
  GetLiftRatioBurst,
  GetLiftRatio
}
