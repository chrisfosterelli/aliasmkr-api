
/* token.js
 * Token router
 */

const bcrypt   = require('bcrypt')
const express  = require('express')
const Joi      = require('joi')
const r        = require('../rethink')
const jwt      = require('../jwt')
const validate = require('../validate')

const schema = Joi.object().keys({
  email : Joi.string().required(),
  password : Joi.string().required()
})

const router = express()
router.post('/', validate.body(schema))
router.post('/', post)
module.exports = router

function post(req, res, next) {
  const index = 'email'
  const email = req.body.email
  const password = req.body.password
  r.table('User')
  .getAll(email, { index })
  .then(users => {
    const user = users[0]
    const err = 'Invalid email or password'
    const upassword = user ? user.password : ''
    bcrypt.compare(password, upassword, (err, match) => {
      if (err) return next(err)
      if (!match) return res.status(403).send(err)
      jwt.sign(user, (err, token) => res.send({ token }))
    })
  })
  .catch(err => next(err))
}
