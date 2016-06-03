
/* domain.js
 * Domain router
 */

const express = require('express')
const r = require('../r')

const router = express()
router.all(jwt.verify())
router.get('/', get)
module.exports = router

function get(req, res, next) {
  const index = 'user'
  const user = req.query.user
  const err = 'You must specify a user'
  if (!user) return next(new HttpError(400, err))
  r.table('Domain')
  .getAll(user, { index })
  .then(domains => res.send(domains))
  .catch(err => next(err))
}
