import dotenv  from "dotenv"
import mongoose from "mongoose"
import { managerSchema } from "../models/Manager.js"

dotenv.config() // load env file

const Manager = mongoose.model("Manager", managerSchema);


export const getManagerByName = (req, res) => {
    Manager.find({ name:{$regex : new RegExp(req.params.ManagerName, 'i')}} ,
    function(err, manager) {
        if (err) {
            res.status(400).json({
                message: err.toString()
            })
        }
        else {
            res.send(manager)
        }
    });
};


export const updateManager = (req, res) => {
    Manager.findOneAndUpdate({ _id: req.body._id }, req.body, { new: false, useFindAndModify: false }, (err, manager) => {
        if (err) {
            res.status(400).json({
                message: err.toString()
            })
        } else {
            res.json({ message: "Successfully updated the manager." })
        }
    })
}

export const updateManagerPassword = async (req, res) => {
    let oldManager = new Manager(req.body)
    if (oldManager.password) {
        oldManager.password = await cryptPwd(oldManager.password)
    }
    Manager.findOneAndUpdate({ _id: req.body._id }, oldManager, { new: false, useFindAndModify: false }, (err, manager) => {
        if (err) {
            res.status(400).json({
                message: err.toString()
            })
        } else {
            res.json({ message: "Successfully updated the manager password." })
        }
    })
}


export const createManager = async(req, res) => {
    let newManager = new Manager(req.body)
    if (newManager.password) {
        newManager.password = await cryptPwd(newManager.password)
    }
    newManager.save()
        .then(manager => {
            res.send(manager)
        })
        .catch(err => {
            res.status(400).json({
                message: err.toString()
            });
        })
};

export const deleteManager = (req, res) => {
    Manager.remove({ _id: req.params.ManagerID }, (err, manager) => {
        if (err) {
            res.status(400).json({
                message: err.toString()
            })
        } else {
            res.json({ message: "Successfully deleted the manager." })
        }
    })
}