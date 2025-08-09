const express = require('express')
const Workout = require('../models/workoutModel')

// creates an instance of the express router
const router = express.Router()

// these are relative routes because in server.js we specified to only fire these routes when we come to a specific path ('/api/workouts')

// GET all workouts
router.get('/', (req, res) => { // meaning ('/api/workouts/')
    res.json({mssg: 'GET all workouts'})
}) 

// GET a single workout
router.get('/:id', (req, res) => {
    res.json({mssg: 'GET a single workout'})
})

// POST a new workout
router.post('/', async (req, res) => {
    const {title, sets, reps, load} = req.body

    try {
        const workout = await Workout.create({title, sets, reps, load}) // applying a method to the Workout model to create a new document
        // this workout object represents the document that was just created
        res.status(200).json(workout)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})

// DELETE a workout
router.delete('/:id', (req, res) => {
    res.json({mssg: 'DELETE a workout'})
})

// UPDATE a workout
router.patch('/:id', (req, res) => {
    res.json({mssg: 'UPDATE a workout'})
})

module.exports = router