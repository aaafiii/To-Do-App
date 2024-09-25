const jwt = require('jsonwebtoken');
const JWT_SECRET = "ritesh@123"
function setUser(user) {
    const payload = {
        id: user._id,
        email: user.email,
        role: user.role,
    }
    return jwt.sign(payload, JWT_SECRET)
}

function getUser(token) {
    if (!token) {
        return null;
    }
    try {
        return jwt.verify(token, JWT_SECRET);
    }
    catch (err) {
        console.log(err);
        return null;
    }
}

module.exports = {
    getUser,
    setUser
}