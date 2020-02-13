require('dotenv').config()
const express = require('express')
const app = express()
const flash = require('connect-flash')

require('./configs/mongoose.config')
require('./configs/middlewares.config')(app)
require('./configs/passport.config')(app)
require('./configs/user-locals')(app)

app.use(flash())

app.use('/', require('./routes/index.routes'))
app.use('/', require('./routes/auth.routes'))
app.use('/', require('./routes/post.routes'))


require('./configs/errorHandler.config')(app) //Esto debe ir al final :)

module.exports = app