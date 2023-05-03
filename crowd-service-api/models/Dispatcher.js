import mongoose from "mongoose"

const Schema = mongoose.Schema

const dispatcherSchema = new Schema({
    username: {
        type: String,
    },
    password: {
        type: String,
    },
    name: {
        type: String,
    },
    address: {
        type: String,
    },
    email: {
        type: String,
    },
    gender: {
        type: String,
    },
    phone: {
        type: String,
    },
    photo: {
        type: String,
    },
})

module.exports = mongoose.model('Dispatcher', dispatcherSchema);