const mongoose = require('mongoose')
const Schema = mongoose.Schema

const categorySchema = new Schema({
    categoryId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    categoryName: {
        type: String,
        minlength: 3,
        maxlength: 18,
        required: true
    }
},
    { timeStamps: true }
)

module.exports = mongoose.model("Category", categorySchema)


