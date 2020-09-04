exports.checkErrors = controller => (req, res, next) =>
  controller(req, res).catch(next)