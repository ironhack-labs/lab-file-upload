const checkRoles = function (role) {
    return function (req, res, next) {
        if (req.isAuthenticated() && req.user.role === role) {
            return next();
        } else {
            res.redirect('/')
        }
    }
}

module.exports = checkRoles;