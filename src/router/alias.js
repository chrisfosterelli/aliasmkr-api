
/* alias.js
 * Alias router
 */

const express = require('express')
const r       = require('../rethink')

const router = express()
router.all(jwt.verify())
router.get('/', validate.query(schema))
router.get('/', permit)
router.get('/', get)
module.exports = router

const schema = Joi.object().keys({
  domain : Joi.string().guid().required()
})

function permit(req, res, next) {
  r.table('Domain')
  .get(req.query.domain)('user')
  .then(user => {
    if (user == req.user.id) return next(); 
    const err = 'You must own this domain'
    return next(new HttpError(403, err))
  })
  .catch(err => next(err))
}

function get(req, res, next) {
  const index = 'domain'
  const domain = req.query.domain
  r.table('Alias')
  .getAll(domain, { index })
  .then(aliases => res.send(aliases))
  .catch(err => next(err))
}
