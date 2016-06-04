
/* jwt.js
 * JWT verification and signing
 */

const expressJwt   = require('express-jwt')
const jsonwebtoken = require('jsonwebtoken')

const secret = process.env.SECRET || ''
if (!secret) throw new Error('SECRET is not set')

module.exports = { sign, verify }

function sign(data, cb) {
  jsonwebtoken.sign(data, secret, {}, cb)
}

function verify() {
  return expressJwt({ secret })
}
