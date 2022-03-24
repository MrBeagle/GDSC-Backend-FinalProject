const User = require('../model/users.model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const req = require('express/lib/request')
const res = require('express/lib/response')
const salt = 10

require('dotenv').config()
const JWT_TOKEN = process.env.JWT_TOKEN

const register = async (req, res) => {
    let { userName, userEmail, userPassword: plainTextPass } = req.body
    let userPassword = await bcrypt.hash(plainTextPass, salt)
    let checkEmail = await User.findOne({ userEmail: userEmail })

    let user = new User({
        userName: userName,
        userEmail: userEmail,
        userPassword: userPassword
    })
    if (!(plainTextPass.length >= 8 && plainTextPass.length <= 20)) {
        res.status(404).send({
            message: 'Password is less than 8 character or more than 20 character'

        }).end()
    } else {

        if (!checkEmail) {
            user = await user.save()
            res.status(201).send({
                status: 201,
                message: 'Register the new user is success',
                user: { userName, userEmail }
            })

        } else {
            res.status(401).send({
                status: 401,
                message: 'Email is already registered, please try another email'
            })

        }
    }


}

const login = async (req, res) => {
    let { userEmail, userPassword } = req.body
    let userLogin = await verifyUser(userEmail, userPassword)

    if (userLogin.status === 400) {
        res.send({ status: 400, message: 'E-mail is not found, please try again' })
    }
    if (userLogin.status === 401) {
        res.send({ status: 401, message: 'Password is wrong,please try again' })
    }
    else {
        res.cookie('token', token, {
            maxAge: 20 * 60 * 1000, httpOnly: true
        })
        res.status(201).send({ status: 201, message: 'Login success', user: userLogin })
    }

}

const verifyUser = async (userEmail, userPassword) => {
    const user = await User.findOne({ userEmail }).lean()

    if (!user) {
        return { status: 400 }
    }

    let verify = await bcrypt.compare(userPassword, user.userPassword)

    if (verify) {
        token = jwt.sign({
            userId: user._id,
            userName: user.userName,
            userPassword: user.userPassword.JWT_TOKEN,
            type: 'user'
        }, JWT_TOKEN, {
            expiresIn: '20m'
        })
        return { userName: user.userName, userEmail: user.userEmail, accessToken: token }
    } else {
        return { status: 401 }
    }

}

const logout = (req, res) => {
    res.cookie('token', token, { maxAge: 1 })
    res.send({ message: 'Logout successfull' })

}

module.exports = { register, login, logout }

