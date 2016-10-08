
/* mailgun.js
 * Mailgun API layer
 */

const _     = require('lodash')
const axios = require('axios')

module.exports = { updateAlias }

const password = process.env.MAILGUN
if (!password) throw new Error('MAILGUN key required')

const username = 'api'
const auth = { username, password }
const transformRequest = [ objectToForm ]
const mailgun = axios.create({ auth, transformRequest })

function objectToForm(obj) {
  const getURL = (key, val) => {
    const encode = encodeURIComponent
    return `${encode(key)}=${encode(val)}`
  }
  return _(obj)
  .toPairs()
  .map(([k, v]) => {
    if (!Array.isArray(v)) return getURL(k, v)
    else return v.map(sv => getURL(k, sv))
  })
  .flatten()
  .join('&')
}

function updateAlias(alias) {
  const description = `Alias UUID: ${alias.id}`
  const expression = `match_recipient("${alias.incoming}")`
  const action = alias.outgoing.map(email => `forward("${email}")`)
  const url = `https://api.mailgun.net/v3/routes/${alias.mailgun}`
  const route = { expression, action, description }
  return mailgun.put(url, route)
  .then(() => alias)
}
