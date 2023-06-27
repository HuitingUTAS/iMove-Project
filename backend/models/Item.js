import mongoose from "mongoose"

const Schema = mongoose.Schema

export const itemSchema = new Schema({
    itemCode: {
        type: String,
    },
    itemName: {
        type: String,
    },
    brand: {
        type: String,
    },
    category: {
        type: String,
    },
    uom: {
        type: String,
    },
    price: {
        type: Number,
    },
    qty: {
        type: Number,
    },
    tax: {
        type: Number,
    },
    value: {
        type: Number,
    },
    weight: {
        type: Number,
    }
})
