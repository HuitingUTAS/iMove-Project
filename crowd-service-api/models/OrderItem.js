import mongoose from "mongoose"

const Schema = mongoose.Schema

const orderItemSchema = new Schema({
    itemCode: {
        type: String,
        required: "Item Code is required."
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
    order: { 
        type: Schema.Types.ObjectId, 
        ref: 'Order' // Refer: https://mongoosejs.com/docs/populate.html
    },
})

module.exports = mongoose.model('OrderItem', orderItemSchema);