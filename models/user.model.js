const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {type: String, minLength:3, maxLength: 30, required: true},
    email: {type: String, minLength:3, maxLength: 30, required: true, unique: true},
    password: {type: String, minLength:3, maxLength: 1024, required: true}
}, {timestamps: true})

const userModel = mongoose.Model('User', userSchema)

module.exports = userModel;