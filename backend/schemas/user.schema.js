import mongoose from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 20,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    email: {
        type: String,
        required: true,
        unique: true,
        maxlength: 40,
        validate: {
            validator: validator.isEmail,
            message: "Invalid email address"
        }
    },
    profilePic: {
        type: String,
        default: null
    },
    about: {
        type: String,
        maxlength: 100,
        minlength: 5
    },
    displayName: {
        type: String,
        minlength: 3,
        maxlength: 20,
    }
}, {timestamps: true})

export default userSchema;