const User = require('../models/User')
const jwt = require('jsonwebtoken')
const login = async (req, res) => {
    const { email, password } = req.body; //note password not verify only checking email if exists
    const user = await User.findOne({ where:{ email: email}})
    if (user) {
        const token = jwt.sign({ id: user.id }, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '15min'});
        res.json({ token });
    } else {
        res.status(401).json({ message: 'Invalid username' });
    }
}
module.exports = { login }