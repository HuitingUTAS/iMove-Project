import dotenv  from "dotenv"
import mongoose from "mongoose"
import { itemSchema } from "../models/Item.js"

dotenv.config() // load env file

const Item = mongoose.model("Item", itemSchema);


export const getAllItems = (req, res) => {
    Item.find({ } ,
    function(err, item) {
        if (err) {
            res.status(400).json({
                message: err.toString()
            })
        }
        else {
            res.send(item)
        }
    });
};

export const updateItem = (req, res) => {
    Item.findOneAndUpdate({ _id: req.body._id }, req.body, { new: false, useFindAndModify: false }, (err, item) => {
        if (err) {
            res.status(400).json({
                message: err.toString()
            })
        } else {
            res.json({ message: "Successfully updated the item." })
        }
    })
}

export const createItem = (req, res) => {
    let newItem = new Item(req.body)
    newItem.save()
        .then(item => {
            res.send(item)
        })
        .catch(err => {
            res.status(400).json({
                message: err.toString()
            });
        })
};

export const deleteItem = (req, res) => {
    Item.remove({ _id: req.params.ItemID }, (err, item) => {
        if (err) {
            res.status(400).json({
                message: err.toString()
            })
        } else {
            res.json({ message: "Successfully deleted the item." })
        }
    })
}
