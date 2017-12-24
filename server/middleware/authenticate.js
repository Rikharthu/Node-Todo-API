const {
    User
} = require('./../models/user');

// Authentication middleware
var authenticate = (req, res, next) => {
    var token = req.header('x-auth');

    User.findByToken(token).then((user) => {
            if (!user) {
                return Promise.reject();
            }

            req.user = user;
            req.token = token;
            next();
        })
        .catch((e) => {
            // Auth failed, do not advance
            res.status(401).send();
        });
};

module.exports = {
    authenticate
};