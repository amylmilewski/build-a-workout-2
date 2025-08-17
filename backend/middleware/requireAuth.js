const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

const requireAuth = async (req, res, next) => {
    
    // verify authentication
    const { authorization } = req.headers

    if (!authorization) {
        return res.status(401).json({error: 'Authorization token required'})
    }

    const token = authorization.split(' ')[1] // splitting the authorization string so the 'Bearer ' portion is ignored

    try {
        const {_id} = jwt.verify(token, process.env.SECRET) // return the id from the payload if the token can be verified

        req.user = await User.findOne({ _id }).select('_id') // the result of the database query (the Mongoose document containing only the _id field, or null if no matching document is found) is assigned to the user property of the req object
        next()

    } catch (error) {
        console.log(error)
        res.status(401).json({error: 'Request is not authorized'})
    }
}

module.exports = requireAuth