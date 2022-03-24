const express = require('express')
const router = express.Router()

const PostController = require('../controller/posts.controller')
const authentication = require('../../auth')

router.get('/', PostController.getAllPosts)
router.get('/:postId', PostController.getPostById)
router.post('/add-post', authentication, PostController.addPost)
router.patch('/update-post/:postId', authentication, PostController.updatePostById)
router.delete('/delete-post/:postId', authentication, PostController.deletePostById)

module.exports = { router }