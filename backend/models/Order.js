import mongoose from "mongoose"

const Schema = mongoose.Schema

const orderStatus = Object.freeze({
    1: 'unallocated',
    2: 'allocated',
    3: 'inProgress',
    4: 'delivered',
    5: '',
});
const currencyCode = Object.freeze({
    AUD: 'AUD',
    USD: 'USD',
});

const shipmentStatusSchema = new Schema(
    { 
        status:{
            type: String,
            enum: Object.values(shipmentStatus),
        },
        date: Date
    },
    {
        _id: false
    }
)

const orderStatusSchema = new Schema(
    { 
        status:{
            type: Number,
        },
        date: Date
    },
    {
        _id: false
    }
)

export const orderSchema = new Schema({
    orderNumber: {
        type: String,
        required: "Order Number is required."
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
        shipmentStatusSchema
    ],
    orderStatus:[
        orderStatusSchema
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
    shipmentStatus, currencyCode
});
