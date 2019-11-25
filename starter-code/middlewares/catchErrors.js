module.exports = function(controller) {
    return function(req, res, next) {
        return controller(req, res).catch(next);
    };
};