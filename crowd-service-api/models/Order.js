import mongoose from "mongoose"

const Schema = mongoose.Schema

const shipmentStatus = Object.freeze({
    Prepared: 'prepared',
    InProgress: 'inProgress',
    Delivered: 'delivered',
    Received: 'received',
});
const paymentStatus = Object.freeze({
    Unpaid: 'unpaid',
    InProgress: 'inProgress',
    Paid: 'Paid',
});
const currencyCode = Object.freeze({
    AUD: 'AUD',
    USD: 'USD',
});

export const orderSchema = new Schema({
    SO: {
        type: String,
        required: "SO is required."
    },
    consignmentID: {
        type: String,
        required: "consignmentID is required."
    },
    createDate: {
        type: Date,
        default: Date.now()
    },
    shipmentStatus:[
        { 
            status:{
                type: String,
                enum: Object.values(shipmentStatus),
            },
            date: Date
        },
    ],
    paymentStatus:[
        { 
            status:{
                type: String,
                enum: Object.values(paymentStatus),
            },
            date: Date
        },
    ],
    currencyCode: {
        type: String,
        enum: Object.values(currencyCode),
    },
    remark: {
        type: String,
    },
    totalAmount: {
        type: Number,
    },
    parcelQty: {
        type: Number,
    },
    prefferedDeliveryDate: {
        type: Date,
        default: Date.now()
    },
    need_fridge: {
        type: Boolean,
    },
    customer: { 
        type: Schema.Types.ObjectId, 
        ref: 'Customer' // Refer: https://mongoosejs.com/docs/populate.html
    },
    car: { 
        type: Schema.Types.ObjectId, 
        ref: 'Car' 
    },
    driver: { 
        type: Schema.Types.ObjectId, 
        ref: 'Driver' 
    },
    sender: { 
        type: Schema.Types.ObjectId, 
        ref: 'Sender' 
    },
})

//Refre: https://rclayton.silvrback.com/export-enumerations-as-static-mongoose-properties
Object.assign(orderSchema.statics, {
    shipmentStatus, paymentStatus, currencyCode
});
