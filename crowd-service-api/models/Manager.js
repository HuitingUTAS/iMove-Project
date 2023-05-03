import mongoose from "mongoose"

const Schema = mongoose.Schema

const accessCode = Object.freeze({
    Manager: 'manager',
});

const managerSchema = new Schema({
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
    accessCode: {
        type: String,
        enum: Object.values(accessCode),
    },
})

module.exports = mongoose.model('Manager', managerSchema);