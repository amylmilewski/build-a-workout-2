const Workout = require('../models/workoutModel')
const mongoose = require('mongoose')

// GET all workouts
const getWorkouts = async (req, res) => {
    const workouts = await Workout.find({}).sort({createdAt: -1}) // we need to pass a blank object here so it will get all of the documents from the collection
    // '.sort({createdAt: -1})' makes it so the newest entries are listed at the top

    res.status(200).json(workouts)
}

// GET a single workout
const getWorkout = async (req, res) => {
    const { id } = req.params

    // before going to find by ID, ensure that the input ID is valid by mongoose standards
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such workout'})
    }

    const workout = await Workout.findById(id)

    // if a workout at that ID cannot be found, return an error
    if (!workout) {
        return res.status(404).json({error: 'No such workout'})
    }

    res.status(200).json(workout)
}


// CREATE a new workout
const createWorkout = async (req, res) => {
    const {title, sets, reps, load} = req.body

    // adding document to db
    try {
        const workout = await Workout.create({title, sets, reps, load}) // applying a method to the Workout model to create a new document
        // this workout object represents the document that was just created
        res.status(200).json(workout)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// DELETE a workout
const deleteWorkout = async (req, res) => {
    const { id } = req.params

    // before going to find the ID to delete, ensure that the input ID is valid by mongoose standards
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such workout'})
    }

    const workout = await Workout.findOneAndDelete({_id: id}) // in MongoDB, the ID property is named '_id'
    // find and delete the document where the MongoDB's ID property is equal to the id passed in the request params

    // if a workout at that ID cannot be found, return an error
    if (!workout) {
        return res.status(400).json({error: 'No such workout'})
    }

    // if we do find a workout at that ID and delete it
    res.status(200).json(workout)
    
}


// UPDATE a workout
const updateWorkout = async (req, res) => {
    const { id } = req.params

    // before going to find the ID to delete, ensure that the input ID is valid by mongoose standards
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such workout'})
    }

    const workout = await Workout.findOneAndUpdate({_id: id}, {
        ...req.body
    }) // first argument is the "find criteria" (based on ID), second argument is an object that represents the updates to be made

     // if a workout at that ID cannot be found, return an error
    if (!workout) {
        return res.status(400).json({error: 'No such workout'})
    }

    res.status(200).json(workout)
}


module.exports = {
    getWorkouts,
    getWorkout,
    createWorkout,
    deleteWorkout,
    updateWorkout
}