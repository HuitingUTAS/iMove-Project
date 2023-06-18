import dotenv  from "dotenv"
import mongoose from "mongoose"
import { itemSchema } from "../models/Item.js"

dotenv.config() // load env file

const Item = mongoose.model("Item", itemSchema);


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