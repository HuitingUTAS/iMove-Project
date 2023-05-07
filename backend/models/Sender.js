import mongoose from "mongoose"

const Schema = mongoose.Schema

export const senderSchema = new Schema({
    accName: {
        type: String,
    },
    accNo: {
        type: String,
    },
    bank: {
        type: String,
    },
    bsb: {
        type: String,
    },
    senderName: {
        type: String,
    },
})
