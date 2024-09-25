const { getUser } = require('../services/auth')

function checkForAuthentication(req, res, next) {
    const tokenValue = req.cookies.token;
    req.user = null;
    if (!tokenValue) {
        return next();
    }
    const token = tokenValue;
    const user = getUser(token);
    req.user = user;
    return next();
}

function restrictTo(roles = []) {
    return function (req, res, next) {
        if (!req.user) {
            return res.redirect('/login');
        }
        if (!roles.includes(req.user.role)) {
            return res.end('Unauthorized access');
        }
        return next();
    }
}

module.exports = {
    checkForAuthentication,
    restrictTo
}