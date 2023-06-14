import dotenv  from "dotenv"
import mongoose from "mongoose"
import { orderSchema } from "../models/Order.js"
import { orderItemSchema } from "../models/OrderItem.js"

dotenv.config() // load env file

const Order = mongoose.model("Order", orderSchema);
const OrderItem = mongoose.model("OrderItem", orderItemSchema);


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
                'lastOrderStatus.status': 'unallocated' 
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
                'lastOrderStatus.status': 'allocated' 
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
