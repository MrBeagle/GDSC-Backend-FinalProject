const req = require('express/lib/request')
const { status } = require('express/lib/response')
const res = require('express/lib/response')
const Post = require('../model/posts.model')
const Category = require('../model/categories.model')
const User = require('../model/users.model')
const { default: mongoose } = require('mongoose')


const addPost = async (req, res) => {
    let postId = req.params.postId
    let { postTitle, postImage, postDescription, users, categories } = req.body

    let post = new Post({
        postId: postId,
        postTitle: postTitle,
        postImage: postImage,
        postDescription: postDescription,
        users: users,
        categories: categories

    })
    try {
        post = await post.save()

        res.status(201).send({ message: 'Create a post success', post: post })

    } catch (error) {
        res.status(400).send({ status: 400, message: 'Create a post failed', error: error.message })
    }


}

const getAllPosts = async (req, res) => {
    try {
        let posts = await Post.find({}).select('postTitle postImage postDescription -_id')

        if (posts.length > 0) {
            res.status(200).send({
                totalPost: posts.length,
                status: 200,
                message: 'Success get all posts',
                posts: posts
            })

        } else {
            res.status(200).send({
                message: 'The post still empty',
                status: 200
            })
        }

    } catch (error) {
        res.status(400).send({ status: 400, message: 'get all post data failed' })

    }


}

const getPostById = async (req, res) => {
    let postId = req.params.postId

    try {
        let post = await Post.findById(postId).select('postTitle postImage postDescription users categories -_id').populate('User').populate('Category')
        res.status(200).send({ message: 'Sucess get post data', post: post })

    } catch (error) {
        res.status(404).send({ message: 'The post is not found', status: 404, error: error.message })

    }

}

const updatePostById = async (req, res) => {
    let postId = req.params.postId
    let { postTitle, postImage, postDescription } = req.body

    try {
        let post = Post.findById(postId)
        post = await post.update({
            postTitle: postTitle,
            postImage: postImage,
            postDescription: postDescription

        })
        res.status(200).send({ message: 'Update post success', post: post })
    } catch (error) {
        res.status(404).send({ message: 'The Post is not found', status: 404 })


    }


}

const deletePostById = async (req, res) => {
    let postId = req.params.postId
    try {
        let post = await Post.findByIdAndRemove(postId)
        res.status(200).send({ message: 'Delete post success', post: post })

    } catch (error) {
        res.status(404).send({ message: 'The post is not found', status: 404 })

    }


}

module.exports = {
    getAllPosts,
    getPostById,
    addPost,
    updatePostById,
    deletePostById

}

