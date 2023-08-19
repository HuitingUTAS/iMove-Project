import dotenv  from "dotenv"
import mongoose from "mongoose"
import { orderSchema } from "../models/Order.js"
import { orderItemSchema } from "../models/OrderItem.js"

dotenv.config() // load env file

const Order = mongoose.model("Order", orderSchema);
const OrderItem = mongoose.model("OrderItem", orderItemSchema);
const ObjectId = mongoose.Types.ObjectId;


export const getOrderByID = (req, res) => {
    Order.aggregate([
        { $match: { "_id": ObjectId(req.params.OrderID) } },
        { $lookup:
            {
                from: "customers",
                localField: "customer",
                foreignField: "_id",
                as: "customer"
            }
        },
        { $unwind: "$customer" },
        { $lookup:
            {
                from: "cars",
                localField: "car",
                foreignField: "_id",
                as: "car"
            }
        },
        { $unwind: "$car" },
        { $lookup:
            {
                from: "drivers",
                localField: "driver",
                foreignField: "_id",
                as: "driver"
            }
        },
        { $unwind: "$driver" },
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

export const getOrderByOrderNumber = (req, res) => {
    Order.aggregate([
        { $match: { "orderNumber": req.params.orderNumber } },
        { $lookup:
            {
                from: "customers",
                localField: "customer",
                foreignField: "_id",
                as: "customer"
            }
        },
        { $unwind: "$customer" },
        { $lookup:
            {
                from: "cars",
                localField: "car",
                foreignField: "_id",
                as: "car"
            }
        },
        { $unwind: "$car" },
        { $lookup:
            {
                from: "drivers",
                localField: "driver",
                foreignField: "_id",
                as: "driver"
            }
        },
        { $unwind: "$driver" },
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

export const getOrderByCar = (req, res) => {
    Order.aggregate([
        { $match: { "car": ObjectId(req.params.CarID) } },
        { $lookup:
            {
                from: "customers",
                localField: "customer",
                foreignField: "_id",
                as: "customer"
            }
        },
        { $unwind: "$customer" },
        { $lookup:
            {
                from: "cars",
                localField: "car",
                foreignField: "_id",
                as: "car"
            }
        },
        { $unwind: "$car" },
        { $lookup:
            {
                from: "drivers",
                localField: "driver",
                foreignField: "_id",
                as: "driver"
            }
        },
        { $unwind: "$driver" },
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

export const getOrderByDriver = (req, res) => {
    Order.aggregate([
        { $match: { "driver": ObjectId(req.params.DriverID) } },
        { $lookup:
            {
                from: "customers",
                localField: "customer",
                foreignField: "_id",
                as: "customer"
            }
        },
        { $unwind: "$customer" },
        { $lookup:
            {
                from: "cars",
                localField: "car",
                foreignField: "_id",
                as: "car"
            }
        },
        { $unwind: "$car" },
        { $lookup:
            {
                from: "drivers",
                localField: "driver",
                foreignField: "_id",
                as: "driver"
            }
        },
        { $unwind: "$driver" },
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

export const updateOrderStatus = (req, res) => {
    const newDate = new Date().toLocaleString('en-US', {
        timeZone: process.env.TZ
    });
    let status = {'status': req.body.status, 'date': newDate}

    Order.updateOne(
        { _id: req.body._id },
        { $push: { orderStatus: status } },
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
