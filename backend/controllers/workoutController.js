const { Exercise } = require('../models/workoutModel')
const mongoose = require('mongoose')

// GET all exercises
const getExercises = async (req, res) => {
    const exercises = await Exercise.find({}).sort({createdAt: -1}) // we need to pass a blank object here so it will get all of the documents from the collection
    // '.sort({createdAt: -1})' makes it so the newest entries are listed at the top

    res.status(200).json(exercises)
}

// GET a single exercise
const getExercise = async (req, res) => {
    const { id } = req.params

    // before going to find by ID, ensure that the input ID is valid by mongoose standards
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such exercise'})
    }

    const exercise = await Exercise.findById(id)

    // if an exercise at that ID cannot be found, return an error
    if (!exercise) {
        return res.status(404).json({error: 'No such exercise'})
    }

    res.status(200).json(exercise)
}


// CREATE a new exercise
const createExercise = async (req, res) => {
    const {title, sets, reps, load} = req.body

    let emptyFields = []

    if (!title) {
        emptyFields.push('title')
    }
    if (!sets) {
        emptyFields.push('sets')
    }
    if (!reps) {
        emptyFields.push('reps')
    }
    if (!load) {
        emptyFields.push('load')
    }
    if (emptyFields.length > 0) {
        return res.status(400).json({error: 'Please fill in all the fields', emptyFields})
    }

    // adding document to db
    try {
        const exercise = await Exercise.create({title, sets, reps, load}) // applying a method to the Exercise model to create a new document
        // this exercise object represents the document that was just created
        res.status(200).json(exercise)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// DELETE an exercise
const deleteExercise = async (req, res) => {
    const { id } = req.params

    // before going to find the ID to delete, ensure that the input ID is valid by mongoose standards
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such exercise'})
    }

    const exercise = await Exercise.findOneAndDelete({_id: id}) // in MongoDB, the ID property is named '_id'
    // find and delete the document where the MongoDB's ID property is equal to the id passed in the request params

    // if an exercise at that ID cannot be found, return an error
    if (!exercise) {
        return res.status(400).json({error: 'No such exercise'})
    }

    // if we do find an exercise at that ID and delete it
    res.status(200).json(exercise)
    
}


// UPDATE an exercise
const updateExercise = async (req, res) => {
    const { id } = req.params

    // before going to find the ID to delete, ensure that the input ID is valid by mongoose standards
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such exercise'})
    }

    const exercise = await Exercise.findOneAndUpdate({_id: id}, {
        ...req.body
    }) // first argument is the "find criteria" (based on ID), second argument is an object that represents the updates to be made

     // if an exercise at that ID cannot be found, return an error
    if (!exercise) {
        return res.status(400).json({error: 'No such exercise'})
    }

    res.status(200).json(exercise)
}


module.exports = {
    getExercises,
    getExercise,
    createExercise,
    deleteExercise,
    updateExercise
}