const Routine = require('../models/routineModel')
const mongoose = require('mongoose')

// GET all routines
const getRoutines = async (req, res) => {
    const routines = await Routine.find({})
        .sort({createdAt: -1}) // we need to pass a blank object here so it will get all of the documents from the collection
        // '.sort({createdAt: -1})' makes it so the newest entries are listed at the top
        .populate('exercises')

    res.status(200).json(routines)
}

// GET a single routine
const getRoutine = async (req, res) => {
    const { id } = req.params

    // before going to find by ID, ensure that the input ID is valid by mongoose standards
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such routine'})
    }

    const routine = await Routine.findById(id).populate('exercises')

    // if a routine at that ID cannot be found, return an error
    if (!routine) {
        return res.status(404).json({error: 'No such routine'})
    }

    res.status(200).json(routine)
}


// CREATE a new routine
const createRoutine = async (req, res) => {
    const {title, exercises} = req.body

    let emptyFields = []

    if (!title) {
        emptyFields.push('title')
    }
    if (emptyFields.length > 0) {
        return res.status(400).json({error: 'Please fill in all the fields', emptyFields})
    }

    // adding document to db
    try {
        const routine = await Routine.create({title, exercises})
        const populatedRoutine = await routine.populate('exercises')
        // ensures the routine's exercises are populated before returning the new routine document
        res.status(200).json(populatedRoutine)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// DELETE a routine
const deleteRoutine = async (req, res) => {
    const { id } = req.params

    // before going to find the ID to delete, ensure that the input ID is valid by mongoose standards
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such routine'})
    }

    const routine = await Routine.findOneAndDelete({_id: id}) // in MongoDB, the ID property is named '_id'
    // find and delete the document where the MongoDB's ID property is equal to the id passed in the request params

    // if a routine at that ID cannot be found, return an error
    if (!routine) {
        return res.status(400).json({error: 'No such routine'})
    }

    // if we do find a routine at that ID and delete it
    res.status(200).json(routine)
    
}


// UPDATE a routine
const updateRoutine = async (req, res) => {
    const { id } = req.params

    // before going to find the ID to delete, ensure that the input ID is valid by mongoose standards
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such routine'})
    }

    const routine = await Routine.findOneAndUpdate({_id: id}, {
        ...req.body
    }) // first argument is the "find criteria" (based on ID), second argument is an object that represents the updates to be made

     // if a routine at that ID cannot be found, return an error
    if (!routine) {
        return res.status(400).json({error: 'No such routine'})
    }
    const populatedRoutine = await routine.populate('exercises') // ensures the routine's exercises are populated before returning the updated routine document
    res.status(200).json(populatedRoutine)
}


module.exports = {
    getRoutines,
    getRoutine,
    createRoutine,
    deleteRoutine,
    updateRoutine
}