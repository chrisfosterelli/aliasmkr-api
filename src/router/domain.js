
/* domain.js
 * Domain router
 */

const express  = require('express')
const Joi      = require('joi')
const r        = require('../rethink')
const jwt      = require('../jwt')
const validate = require('../validate')

const schema = Joi.object().keys({
  user : Joi.string().guid().required()
})

const router = express()
router.use(jwt.verify())
router.get('/', validate.query(schema))
router.get('/', get)
module.exports = router

function get(req, res, next) {
  const index = 'user'
  const user = req.query.user
  r.table('Domain')
  .getAll(user, { index })
  .then(domains => res.send(domains))
  .catch(err => next(err))
}
