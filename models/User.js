import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true,
        minlength: 6
    },
    isAdmin: {
        type: Boolean, 
        default: false
     },
})

const userModel = mongoose.model("User", userSchema)

export { userModel }