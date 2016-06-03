
/* validate.js
 * Joi validation middleware
 */

const Joi = require('joi')

module.exports = validate

function validate(schema) {
  return (req, res, next) => {
    const opts = { abortEarly : false }
    Joi.validate(req.body, schema, opts, next)
  }
}
