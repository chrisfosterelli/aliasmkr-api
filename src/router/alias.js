
/* alias.js
 * Alias router
 */

const express = require('express')
const r = require('../r')

const router = express()
router.all(jwt.verify())
router.get('/', permit, get)
module.exports = router

function permit(req, res, next) {
  
}

function get(req, res, next) {
  const index = 'domain'
  const domain = req.query.domain
  const err = 'You must specify a domain'
  if (!domain) return next(new HttpError(400, err))
  r.table('Alias')
  .getAll(domain, { index })
  .then(aliases => res.send(aliases))
  .catch(err => next(err))
}
