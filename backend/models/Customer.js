import mongoose from "mongoose"

const Schema = mongoose.Schema

export const customerSchema = new Schema({
    companyName: {
        type: String,
    },
    code: {
        type: String,
    },
    website: {
        type: String,
    },
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
    },
    contactOffice: {
        type: String,
    },
    contactMobile: {
        type: String,
    },
    description: {
        type: String,
    },
    building: {
        type: String,
    },
    address: {
        type: String,
    },
    country: {
        type: String,
    },
    state: {
        type: String,
    },
    city: {
        type: String,
    },
    postal: {
        type: String,
    },
    tags: {
        type: String,
    },
})
