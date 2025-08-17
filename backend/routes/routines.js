const express = require('express')
const {
    createRoutine,
    getRoutines,
    getRoutine,
    deleteRoutine,
    updateRoutine
} = require('../controllers/routineController')
const requireAuth = require('../middleware/requireAuth')

// creates an instance of the express router
const router = express.Router()

router.use(requireAuth) // need to fire this middleware function before any other routes so that all routes are protected

// these are relative routes because in server.js we specified to only fire these routes when we come to a specific path ('/api/routines')

// GET all routines
router.get('/', getRoutines) 

// GET a single routine
router.get('/:id', getRoutine)

// POST a new routine
router.post('/', createRoutine) // when a post request comes in, fire the asynchronous function called createRoutine which is defined in routineController.js

// DELETE a routine
router.delete('/:id', deleteRoutine)

// UPDATE a routine
router.patch('/:id', updateRoutine)

module.exports = router