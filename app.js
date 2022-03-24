const express = require('express')
const app = express()
const PORT = 3000
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const PostRouter = require('./src/route/posts.route')
const CategoryRouter = require('./src/route/categories.route')
const UserRouter = require('./src/route/users.route')

// MongoDB URL
require('dotenv').config()
const MONGO_URL = process.env.MONGO_URL

// Middleware
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

// Routes
app.use('/v1/posts/', PostRouter.router)
app.use('/v1/categories/', CategoryRouter.router)
app.use('/v1/users/', UserRouter.router)


app.get('/', (req, res) => {
    res.send({ message: 'Hello Node JS' })

})

// Server
mongoose.connect(MONGO_URL)
    .then(() => {

        app.listen(PORT, (error) => {
            if (error) process.exit(1)
            console.log(`App is Successfully Running on PORT http://localhost:${PORT}`)

        })

    })
    .catch(error => console.log(error))

