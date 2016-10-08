
/* alias.js
 * Alias router
 */

const express  = require('express')
const Joi      = require('joi')
const jwt      = require('../jwt')
const r        = require('../rethink')
const validate = require('../validate')

const schema = Joi.object().keys({
  domain : Joi.string().guid().required()
})

const router = express()
router.use(jwt.verify())
router.get('/', validate.query(schema))
router.get('/', permitDomain)
router.get('/', get)
router.get('/:alias', permitId)
router.get('/:alias', getById)
router.post('/:alias/outgoing', permitId)
router.post('/:alias/outgoing', addOutgoing)
module.exports = router

function permitDomain(req, res, next) {
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

function permitId(req, res, next) {
  const domain = r.table('Alias')
  .get(req.params.alias)('domain')
  r.table('Domain')
  .get(domain)('user')
  .then(user => {
    if (user == req.user.id) return next(); 
    const err = 'You must own this domain'
    return next(new HttpError(403, err))
  })
  .catch(err => next(err))
}

function getById(req, res, next) {
  r.table('Alias')
  .get(req.params.alias)
  .then(alias => res.send(alias))
  .catch(err => next(err))
}

function addOutgoing(req, res, next) {
  r.table('Alias')
  .get(req.params.alias)
  .then(alias => {
    alias.outgoing.append(req.body)
    return mailgun.updateAlias(alias)
    .then(alias => alias.outgoing)
  })
  .then(outgoing => {
    return r.table('Alias')
    .get(req.params.alias)
    .update({ outgoing })
  })
  .then(() => res.send(req.body))
  .catch(err => next(err))
}
