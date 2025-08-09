const express = require('express')
const {
    createExercise,
    getExercises,
    getExercise,
    deleteExercise,
    updateExercise
} = require('../controllers/workoutController')

// creates an instance of the express router
const router = express.Router()

// these are relative routes because in server.js we specified to only fire these routes when we come to a specific path ('/api/exercises')

// GET all exercises
router.get('/', getExercises) 

// GET a single exercise
router.get('/:id', getExercise)

// POST a new exercise
router.post('/', createExercise) // when a post request comes in, fire the asynchronous function called createExercise which is defined in workoutController.js

// DELETE an exercise
router.delete('/:id', deleteExercise)

// UPDATE an exercise
router.patch('/:id', updateExercise)

module.exports = router