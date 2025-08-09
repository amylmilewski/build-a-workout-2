const mongoose = require('mongoose')

const Schema = mongoose.Schema

// this schema defines the structure of a particular exercise document saved to the collection
const exerciseSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    sets: {
        type: Number,
        required: true
    },
    reps: {
        type: Number,
        required: true
    },
    load: {
        type: Number,
        required: true
    }
}, { timestamps: true })

// this model applies the exercise schema and this is what methods are used on
module.exports = mongoose.model('Exercise', exerciseSchema)