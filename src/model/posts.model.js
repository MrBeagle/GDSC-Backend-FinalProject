
const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Validate postImage file extension
const postImageValidation = (postImage) => {
    let regex = /(\.jpg|\.jpeg|\.png)$/i;

    return regex.test(postImage)
}

const postSchema = new Schema({

    postTitle: {
        type: String,
        minlength: 5,
        maxlength: 20,
        required: true
    },
    postImage: {
        type: String,
        validate: postImageValidation,
        required: true
    },
    postDescription: {
        type: String,
        minlength: 5,
        required: true
    },
    // FK User & Category
    users: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    categories: [{ type: Schema.Types.ObjectId, ref: 'Category' }]

}, {
    timestamps: { createdAt: true }
}, {
    versionKey: false
}
)

module.exports = mongoose.model("Post", postSchema)
