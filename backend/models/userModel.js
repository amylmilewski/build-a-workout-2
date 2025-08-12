const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

// static signup method
userSchema.statics.signup = async function (email, password) {

    // validation
    if (!email || !password) {
        throw Error('All fields must be filled')
    }
    if (!validator.isEmail(email)) {
        throw Error('Email is not valid')
    }
    if (!validator.isStrongPassword(password)) {
        throw Error('Password is not strong enough')
    }

    const exists = await this.findOne({ email })

    if (exists) {
        throw Error('Email already in use')
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    // creates a new user document
    const user = await this.create({ email, password: hash })

    return user
}

// static login method
userSchema.statics.login = async function (email, password) {

    // validation
    if (!email || !password) {
        throw Error('All fields must be filled')
    }

    const user = await this.findOne({ email })

    if (!user) {
        throw Error('Incorrect email')
    }

    const match = await bcrypt.compare(password, user.password) // 'user.password', the password property on the user document, is the hashed password whereas 'password' here just refers to the plain text password
    // bcrypt will return true or false based on whether or not they match

    if (!match) {
        throw Error('Incorrect password')
    }

    // if everything is a success
    return user
}

module.exports = mongoose.model('User', userSchema)

// Note: Mongoose won't allow users to save documents to the database unless they adhere to this schema structure