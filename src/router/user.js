
/* user.js
 * User router
 */

const express = require('express')
const _       = require('lodash')
const jwt     = require('../jwt')

const router = express()
router.use(jwt.verify())
router.get('/self', getSelf)
module.exports = router

function getSelf(req, res, next) {
  res.send(_.omit(req.user, 'password'))
}
