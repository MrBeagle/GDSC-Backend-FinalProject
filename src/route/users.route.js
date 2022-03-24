const express = require('express')
const router = express.Router()
const UserController = require('../controller/users.controller')


router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.post('/logout', UserController.logout)

module.exports = { router }