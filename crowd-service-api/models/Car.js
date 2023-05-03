import mongoose from "mongoose"

const Schema = mongoose.Schema

const carSchema = new Schema({
    make: {
        type: String,
    },
    model: {
        type: String,
    },
    type: {
        type: String,
    },
    registrationNumber: {
        type: String,
    },
    volume: {
        type: String,
    },
    hasFridge: {
        type: Boolean,
    },
    isInsuranced: {
        type: Boolean,
    },
    photo: {
        type: String,
    },
})

module.exports = mongoose.model('Car', carSchema);