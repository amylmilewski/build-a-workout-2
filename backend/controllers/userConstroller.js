const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

// creating a custom function that generates JWTs to reuse for both the login and signup cases
const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d' })
}

// login user
const loginUser = async (req, res) => {
    const {email, password} = req.body

    try {
        const user = await User.login(email, password) // if everything works, User.login() returns a user document which is stored in this 'user' constant now

        // create a token (the id of the user document just created above is included in the payload)
        const token = createToken(user._id)

        res.status(200).json({email, token}) // pass the token back to the browser, effectively authenticating them right away after signing up
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// signup user
const signupUser = async (req, res) => {
    const {email, password} = req.body

    try {
        // try signing up and saving the user to the database
        const user = await User.signup(email, password)

        // create a token (the id of the user document just created above is included in the payload)
        const token = createToken(user._id)

        res.status(200).json({email, token}) // pass the token back to the browser, effectively authenticating them right away after signing up
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = { signupUser, loginUser }