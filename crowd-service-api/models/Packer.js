import mongoose from "mongoose"

const Schema = mongoose.Schema

const packerScherSchema = new Schema({
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

module.exports = mongoose.model('Packer', packerScherSchema);