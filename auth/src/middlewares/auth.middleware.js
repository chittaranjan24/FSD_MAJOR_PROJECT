const jwt = require('jsonwebtoken');
const userModel = require('../models/user.model')


async function authMiddleware(req, res, next) {
    const token = req.cookies.token || '';
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized!' });
    }

    try {
        const decoded = await jwt.verify(token, process.env.JWT_SECRET);
        
        const user = decoded

        req.user = user

        next();
    } catch (error) {
        return res.status(403).json({ message: 'Forbidden!' });
    }
}

module.exports = {
    authMiddleware
};