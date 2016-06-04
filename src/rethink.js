
/* rethink.js
 * RethinkDB client
 */

const url     = require('url')
const rethink = require('rethinkdbdash')

const rethinkUrl = process.env.RETHINKDB || ''
const parsed = url.parse(rethinkUrl)
parsed.pathname = parsed.pathname || ''

const db = parsed.pathname.substr(1)
const host = parsed.hostname
const port = parsed.port

const r = rethink({ host, port, db })
export default r

