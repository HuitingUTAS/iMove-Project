import mongoose from "mongoose"

const Schema = mongoose.Schema

const driverSchema = new Schema({
    name: {
        type: String,
    },
    gender: {
        type: String,
    },
    email: {
        type: String,
    },
    phone: {
        type: String,
    },
    address: {
        type: String,
    },
    licenseNumber: {
        type: String,
    },
    licensePhoto: {
        type: String,
    },
    photo: {
        type: String,
    },
})

module.exports = mongoose.model('Driver', driverSchema);