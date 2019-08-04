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
export default {
  Decrypt,
  Encrypt,
  EncryptSha1
}
