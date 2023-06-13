import dotenv  from "dotenv"
import mongoose from "mongoose"
import { orderSchema } from "../models/Order.js"

dotenv.config() // load env file

const Order = mongoose.model("Order", orderSchema);


export const getOrderByOrderNumber = (req, res) => {
    Order.findOne({ "orderNumber": req.params.orderNumber },
    function(err, orders) {
        if (err) {
            res.status(400).json({
                message: err.toString()
            })
        } else {
            res.send(orders)
        }
    });
}
