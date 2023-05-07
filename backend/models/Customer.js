import mongoose from "mongoose"

const Schema = mongoose.Schema

export const customerSchema = new Schema({
    customerPO: {
        type: String,
        required: "CustomerPO is required."
    },
    customerName: {
        type: String,
        required: "Customer Name is required."
    },
    address: {
        type: String,
        required: "Address is required."
    },
})
