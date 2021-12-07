const jwt = require('jsonwebtoken');

const secretKey = 'SOME_JWT_ACCESS_SECRET';

const generateToken = (payload) => jwt.sign(payload, secretKey, {});
const validateToken = (token) => jwt.verify(token, secretKey, (err, decoded) => err ? null : decoded);

const getDataFromCookie = (cookie) => {
    return cookie.split(';').reduce((res, item) => {
        const data = item.trim().split('=');
        return { ...res, [data[0]]: data[1] };
    }, {});
}

const authMiddleware = (req, res, next) => {
    try {
        const {cookie} = req.headers;
        const token = getDataFromCookie(cookie).auth;
        if (!token) throw new Error();
        const userData = validateToken(token, secretKey);
        if (!userData) throw new Error();
        req.user = userData;
        next();
    } catch (e) {
        return res.sendStatus(401);
    }
}

module.exports = {
    generateToken,
    validateToken,
    authMiddleware
}