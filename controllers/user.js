const User = require('../models/user');
const bcrypt = require('bcryptjs');
const { getUser, setUser } = require('../services/auth');

async function handleCreateNewUser(req, res) {
    const salt = 10;
    try {
        const { name, email, password } = req.body;
        const hashPassword = await bcrypt.hash(password, salt);
        const userCheck = await User.findOne({ email: email });
        if (userCheck) {
            return res.redirect('/signup');
        }
        else {
            const newUser = await User.create({
                name,
                email,
                password: hashPassword,
                role: "ADMIN"
            })
            return res.redirect('/login');
        }
    } catch (error) {
        console.log(error)
        return res.json({
            status: false,
            message: error.message
        })
    }
}

async function handleUserLogin(req, res) {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!user || !isMatch) {
        return res.redirect('/login');
    }
    const token = setUser(user);
    res.cookie('token', token);
    return res.redirect('/');
}

module.exports = {
    handleCreateNewUser,
    handleUserLogin
}