require('dotenv').config()
const jwt = require('jsonwebtoken')
const JWT_TOKEN = process.env.JWT_TOKEN

const verifyToken = (req, res, next) => {
    let token = req.cookies

    if (!token) {
        return res.status(403).send({ message: 'A token is required for authentication' })
    }

    try {
        let verify = jwt.verify(token.token, JWT_TOKEN)
    } catch (error) {
        return res.status(401).send({ status: 401, message: 'You must login first as user to access this page' })
    }

    return next()
}

module.exports = verifyToken 