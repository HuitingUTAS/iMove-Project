import dotenv  from "dotenv"
import mongoose from "mongoose"
import { orderSchema } from "../models/Order.js"
import { orderItemSchema } from "../models/OrderItem.js"

dotenv.config() // load env file

const Order = mongoose.model("Order", orderSchema);
const OrderItem = mongoose.model("OrderItem", orderItemSchema);


export const getOrderByID = (req, res) => {
    Order.findOne({ "_id": req.params.OrderID },
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

export const getOrderByCar = (req, res) => {
    Order.findOne({ "car": req.params.CarID },
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

export const getOrderByDriver = (req, res) => {
    Order.findOne({ "driver": req.params.DriverID },
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

export const getUnallocatedOrder = (req, res) => {
    Order.aggregate([
        {
            $addFields: {
                lastOrderStatus: {
                    $last: "$orderStatus"
                }
            }
        },
        { 
            $match: { 
                'lastOrderStatus.status': 1 
            } 
        }
      ],
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

export const getAllocatedOrder = (req, res) => {
    Order.aggregate([
        { $lookup:
            {
               from: "orderitems",
               localField: "_id",
               foreignField: "order",
               as: "orderitems"
            }
        },
        {
            $addFields: {
                lastOrderStatus: {
                    $last: "$orderStatus"
                }
            }
        },
        { 
            $match: { 
                'lastOrderStatus.status': 2 
            } 
        }
      ],
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

export const updateOrder = (req, res) => {
    Order.findOneAndUpdate({ _id: req.body._id }, req.body, { new: false, useFindAndModify: false }, (err, order) => {
        if (err) {
            res.status(400).json({
                message: err.toString()
            })
        } else {
            res.json({ message: "Successfully updated the order." })
        }
    })
}

export const updateOrderShipmentStatus = (req, res) => {
    const newDate = new Date().toLocaleString('en-US', {
        timeZone: process.env.TZ
    });
    let status = {'status': req.body.status, 'date': newDate}

    Order.updateOne(
        { _id: req.body._id },
        { $push: { shipmentStatus: status } },
        (err, order) => {
            if (err) {
                res.status(400).json({
                    message: err.toString()
                })
            } else {
                res.json({ message: "Successfully updated the order." })
            }
        }
    )
}
