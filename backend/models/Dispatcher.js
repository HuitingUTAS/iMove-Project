import mongoose from "mongoose"

const Schema = mongoose.Schema

export const dispatcherSchema = new Schema({
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
    status: {
        type: Boolean,
    },
})
