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

const itemsSchema = new Schema(
    { 
        itemName:{
            type: String,
        },
        UOM:{
            type: String,
        },
        quantity:{
            type: Number,
        },
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
    },
    createDate: {
        type: Date,
        default: Date.now()
    },
    startTime: {
        type: Date,
        default: Date.now()
    },
    endTime: {
        type: Date,
    },
    orderStatus:[
        orderStatusSchema
    ],
    items:[
        itemsSchema
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
    currencyCode
});
