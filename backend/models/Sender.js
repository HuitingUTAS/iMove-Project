import mongoose from "mongoose"

const Schema = mongoose.Schema

export const senderSchema = new Schema({
    name: {
        type: String,
    },
})
