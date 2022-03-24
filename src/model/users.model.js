const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Regex for email validation
const validateEmail = (userEmail) => {
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return regex.test(userEmail)
}


const userSchema = new Schema({
    userName: {
        type: String,
        minlength: 5,
        maxlength: 20,
        required: true
    },
    userEmail: {
        type: String,
        unique: true,
        lowercase: true,
        validate: validateEmail,
        required: true
    },
    userPassword: {
        type: String,
        required: true
    }
}, {
    timestamps: { createdAt: true, updatedAt: false }
})

module.exports = mongoose.model("User", userSchema)