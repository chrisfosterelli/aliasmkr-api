
/* domain.js
 * Domain router
 */

const express = require('express')
const r       = require('../rethink')

const router = express()
router.all(jwt.verify())
router.get('/', validate.query(schema))
router.get('/', get)
module.exports = router

const schema = Joi.object().keys({
  user : Joi.string().guid().required()
})

function get(req, res, next) {
  const index = 'user'
  const user = req.query.user
  r.table('Domain')
  .getAll(user, { index })
  .then(domains => res.send(domains))
  .catch(err => next(err))
}
