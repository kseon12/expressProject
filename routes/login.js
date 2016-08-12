
var User = require('../models/userModel').User;
var HttpError = require('../middleware/errors/httpError').HttpError;
var AuthError = require('../models/userModel').AuthError;
var async = require('../node_modules/async');
var log = require('middleware/interceptors/logger')(module);

exports.get = function(req, res) {
    res.render('login');
};

exports.post = function(req, res, next) {
    var username = req.body.username;
    var password = req.body.password;

    User.authorize(username, password, function(err, user) {
        if (err) {
            if (err instanceof AuthError) {
                return next(new HttpError(403, err.message));
            } else {
                return next(err);
            }
        }

        req.session.user = user._id;
        res.send({});

    });

};