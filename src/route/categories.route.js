const express = require('express')
const router = express.Router()

const CategoryController = require('../controller/categories.controller')
const authentication = require('./../../auth')

router.get('/', CategoryController.getAllCategories)
router.post('/add-category', authentication, CategoryController.addCategory)
router.get('/:categoryId', CategoryController.getCategoryById)

module.exports = { router }
