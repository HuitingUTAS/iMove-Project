import mongoose from "mongoose"

const Schema = mongoose.Schema

export const driverSchema = new Schema({
    username: {
        type: String,
    },
    password: {
        type: String,
    },
    name: {
        type: String,
    },
    gender: {
        type: String,
    },
    age: {
        type: Number,
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
    status: {
        type: Boolean,
    },
})
