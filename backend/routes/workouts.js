const express = require('express')
const {
    createWorkout,
    getWorkouts,
    getWorkout,
    deleteWorkout,
    updateWorkout
} = require('../controllers/workoutController')

// creates an instance of the express router
const router = express.Router()

// these are relative routes because in server.js we specified to only fire these routes when we come to a specific path ('/api/workouts')

// GET all workouts
router.get('/', getWorkouts) 

// GET a single workout
router.get('/:id', getWorkout)

// POST a new workout
router.post('/', createWorkout) // when a post request comes in, fire the asynchronous function called createWorkout which is defined in workoutController.js

// DELETE a workout
router.delete('/:id', deleteWorkout)

// UPDATE a workout
router.patch('/:id', updateWorkout)

module.exports = router