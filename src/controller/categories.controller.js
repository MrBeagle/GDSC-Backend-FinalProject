const req = require('express/lib/request')
const { status } = require('express/lib/response')
const res = require('express/lib/response')
const Category = require("../model/categories.model");

const getAllCategories = async (req, res) => {
    let categories = await Category.find({}).select('-__v')

    try {
        if (categories.length > 0) {
            res.status(200).send({
                totalPosts: categories.length,
                status: 200,
                message: 'Success get all categories',
                categories: { categories }

            })
        }
        else {
            res.status(200).send({ status: 200, message: 'The category still empty' })
        }

    } catch (error) {
        res.status(400).send({ status: 400, message: 'get all category data failed' })

    }


}

const addCategory = async (req, res) => {
    let { categoryName } = req.body
    let categoryId = req.params.categoryId
    let href = `http://localhost:3000/v1/categories/${categoryId}`

    let category = new Category({
        categoryName: categoryName,
        href: href
    })
    try {
        category = await category.save()

        res.status(201).send({ status: 201, message: 'Create a category success', category: { categoryName, href } })
    } catch (error) {
        res.status(400).send({ status: 400, message: 'Create a category failed' })

    }


}
const getCategoryById = async (req, res) => {
    let categoryId = req.params.categoryId

    try {
        let category = await Category.findById(categoryId)
        res.status(200).send({ message: 'Success get category data', status: 200, category: { category } })

    } catch (error) {
        res.status(404).send({ message: 'The category is not found', status: 404 })

    }

}
module.exports = {
    getAllCategories,
    addCategory,
    getCategoryById
}