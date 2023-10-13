import dotenv  from "dotenv"
import mongoose from "mongoose"
import { senderSchema } from "../models/Sender.js"

dotenv.config() // load env file

const Sender = mongoose.model("Sender", senderSchema);


export const getAllSenders = (req, res) => {
    Sender.find({},
    function(err, cars) {
        if (err) {
            res.status(400).json({
                message: err.toString()
            })
        } else {
            res.send(cars)
        }
    });
};
