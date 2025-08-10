// load environment variables from a .env file into process.env
require('dotenv').config()

const express = require('express')
const cors = require('cors');
const mongoose = require('mongoose')
const exerciseRoutes = require('./routes/exercises')
const routineRoutes = require('./routes/routines')

const app = express()

// global middleware that fires for every request that comes in
app.use(cors()); // Enables CORS for all routes and origins
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// attaches all routes from the express router to the end of the '/api/exercises' path
app.use('/api/exercises', exerciseRoutes)
app.use('/api/routines', routineRoutes)

// connect to db (this is asynchronous so it returns a promise) with connection string (MONGO_URI)
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // listen for requests (only once we're connected to the database)
        app.listen(process.env.PORT, () => {
            console.log('connected to db, listening on port', process.env.PORT)
        })
    })
    .catch((error) => {
        console.log(error)
    })