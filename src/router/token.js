
/* token.js
 * Token router
 */

const bcrypt = require('bcrypt')
const express = require('express')
const Joi = require('joi')
const jwt = require('../jwt')
const validate = require('../validate')

const router = express()
router.post('/', validate(schema), post)
module.exports = router

const schema = Joi.object().keys({
  username : Joi.string().required(),
  password : Joi.string().required()
})

function post(req, res, next) {
  const index = 'username'
  const username = req.body.username
  const password = req.body.password
  r.table('User')
  .getAll(username, { index })
  .then(users => {
    const user = users[0]
    const err = 'Invalid username or password'
    const upassword = user ? user.password : ''
    bcrypt.compare(upassword, password, (err, match) => {
      if (err) return next(err)
      if (!match) return next(new HttpError(403, err))
      jwt.sign(user, token => res.send({ token }))
    })
  })
  .catch(err => next(err))
}
