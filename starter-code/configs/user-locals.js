module.exports = app => {
  app.use((req, res, next) => {
    res.locals.user = req.user
    next()
  })
}