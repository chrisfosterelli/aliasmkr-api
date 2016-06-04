
/* validate.js
 * Joi validation middleware
 */

const Joi = require('joi')

module.exports = { body, query }

function body(schema) {
  return (req, res, next) => {
    const opts = { abortEarly : false }
    Joi.validate(req.body, schema, opts, next)
  }
}

function query(schema) {
  return (req, res, next) => {
    const opts = { abortEarly : false }
    Joi.validate(req.query, schema, opts, next)
  }
}
