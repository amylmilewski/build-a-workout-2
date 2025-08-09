const express = require('express')

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
router.post('/', (req, res) => {
    res.json({mssg: 'POST a new workout'})
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