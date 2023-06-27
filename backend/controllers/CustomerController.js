import dotenv  from "dotenv"
import mongoose from "mongoose"
import { customerSchema } from "../models/Customer.js"

dotenv.config() // load env file

const Customer = mongoose.model("Customer", customerSchema);


export const getAllCustomers = (req, res) => {
    Customer.find({ } ,
    function(err, customer) {
        if (err) {
            res.status(400).json({
                message: err.toString()
            })
        }
        else {
            res.send(customer)
        }
    });
};


export const updateCustomer = (req, res) => {
    Customer.findOneAndUpdate({ _id: req.body._id }, req.body, { new: false, useFindAndModify: false }, (err, customer) => {
        if (err) {
            res.status(400).json({
                message: err.toString()
            })
        } else {
            res.json({ message: "Successfully updated the customer." })
        }
    })
}


export const createCustomer = async(req, res) => {
    let newCustomer = new Customer(req.body)
    newCustomer.save()
        .then(customer => {
            res.send(customer)
        })
        .catch(err => {
            res.status(400).json({
                message: err.toString()
            });
        })
};

export const deleteCustomer = (req, res) => {
    Customer.remove({ _id: req.params.CustomerID }, (err, customer) => {
        if (err) {
            res.status(400).json({
                message: err.toString()
            })
        } else {
            res.json({ message: "Successfully deleted the customer." })
        }
    })
}