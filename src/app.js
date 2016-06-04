
/* app.js
 * Main express app
 */

const express = require('express')

const app = express()
app.use('/alias', require('router/alias'))
app.use('/domain', require('router/domain'))
app.use('/token', require('router/token'))
app.use('/user', require('router/user'))
module.exports = app
