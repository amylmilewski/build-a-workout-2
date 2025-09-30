const { exerciseSchema } = require('./workoutModel')
const mongoose = require('mongoose')

const Schema = mongoose.Schema

// this schema defines the structure of a particular routine document saved to the collection
const routineSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    user_id: {
        type: String,
        required: true
    },
    exercises: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Exercise'}] 
}, { timestamps: true })

// this model applies the routine schema and this is what methods are used on
module.exports = mongoose.model('Routine', routineSchema)