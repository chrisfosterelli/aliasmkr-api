
/* validate.js
 * Joi validation middleware
 */

const Joi = require('joi')

module.exports = { body, query }

function body(schema) {
  return (req, res, next) => {
    const opts = { abortEarly : true }
    Joi.validate(req.body, schema, opts, err => {
      if (!err) return next()
      res.status(400).send(err)
    })
  }
}

function query(schema) {
  return (req, res, next) => {
  const opts = { abortEarly : true }
    Joi.validate(req.query, schema, opts, err => {
      if (!err) return next()
      res.status(400).send(err)
    })
  }
}
