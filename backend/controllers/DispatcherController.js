import dotenv  from "dotenv"
import mongoose from "mongoose"
import { dispatcherSchema } from "../models/Dispatcher.js"
import { cryptPwd } from "./UserController.js"

dotenv.config() // load env file

const Dispatcher = mongoose.model("Dispatcher", dispatcherSchema);


export const getDispatcherByNumber = (req, res) => {
    Dispatcher.find({ name:{$regex : new RegExp(req.params.DispatcherName, 'i')}} ,
    function(err, dispatcher) {
        if (err) {
            res.status(400).json({
                message: err.toString()
            })
        }
        else {
            res.send(dispatcher)
        }
    });
};


export const updateDispatcher = async (req, res) => {
    Dispatcher.findOneAndUpdate({ _id: req.body._id }, req.body, { new: false, useFindAndModify: false }, (err, dispatcher) => {
        if (err) {
            res.status(400).json({
                message: err.toString()
            })
        } else {
            res.json({ message: "Successfully updated the dispatcher." })
        }
    })
}

export const updateDispatcherPassword = async (req, res) => {
    let oldDispatcher = new Dispatcher(req.body)
    if (oldDispatcher.password) {
        oldDispatcher.password = await cryptPwd(oldDispatcher.password)
    }
    Dispatcher.findOneAndUpdate({ _id: req.body._id }, oldDispatcher, { new: false, useFindAndModify: false }, (err, dispatcher) => {
        if (err) {
            res.status(400).json({
                message: err.toString()
            })
        } else {
            res.json({ message: "Successfully updated the dispatcher password." })
        }
    })
}

export const createDispatcher = async(req, res) => {
    let newDispatcher = new Dispatcher(req.body)
    if (newDispatcher.password) {
        newDispatcher.password = await cryptPwd(newDispatcher.password)
    }
    newDispatcher.save()
        .then(dispatcher => {
            res.send(dispatcher)
        })
        .catch(err => {
            res.status(400).json({
                message: err.toString()
            });
        })
};

export const deleteDispatcher = (req, res) => {
    Dispatcher.remove({ _id: req.params.DispatcherID }, (err, dispatcher) => {
        if (err) {
            res.status(400).json({
                message: err.toString()
            })
        } else {
            res.json({ message: "Successfully deleted the dispatcher." })
        }
    })
}