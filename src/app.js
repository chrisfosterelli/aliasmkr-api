
/* app.js
 * Main express app
 */

const cors       = require('cors')
const bodyParser = require('body-parser')
const express    = require('express')

const app = express()

app.use(cors())
app.use(bodyParser.text())
app.use(bodyParser.json())
app.use('/alias', require('./router/alias'))
app.use('/domain', require('./router/domain'))
app.use('/token', require('./router/token'))
app.use('/user', require('./router/user'))

module.exports = app
