const app             = require('express')()
const passport        = require('passport')
const LocalStrategy   = require('passport-local').Strategy
const mongoose        = require('mongoose')
const flash           = require('connect-flash')

require("dotenv").config()
mongoose.connect(process.env.MONGODB_URI)

require('./config/express')(app)

require('./passport/serializers')
require('./passport/local')

app.use(flash())
app.use(passport.initialize())
app.use(passport.session())

const index = require('./routes/index')
const authRoutes = require('./routes/authentication')
const postController = require('./routes/postController')

app.use('/', index)
app.use('/', authRoutes)
app.use('/', postController)

require('./config/handle-errors')(app)

module.exports = app
