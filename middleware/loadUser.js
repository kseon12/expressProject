var User = require('models/userModel').User;
var log = require('middleware/interceptors/logger')(module);

module.exports = function(req, res, next) {
    req.user = res.locals.user = null;
    log.info(req.session);
    if (!req.session.user) return next();

    User.findById(req.session.user, function(err, user) {
        if (err) {
            return next(err);
        }

        req.user = res.locals.user = user;
        next();
    });
};