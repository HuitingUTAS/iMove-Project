import dotenv  from "dotenv"
import mongoose from "mongoose"
import { packerSchema } from "../models/Packer.js"
import { cryptPwd } from "./UserController.js"

dotenv.config() // load env file

const Packer = mongoose.model("Packer", packerSchema);


export const getPackerByName = (req, res) => {
    Packer.find({ name:{$regex : new RegExp(req.params.PackerName, 'i')}} ,
    function(err, packer) {
        if (err) {
            res.status(400).json({
                message: err.toString()
            })
        }
        else {
            res.send(packer)
        }
    });
};


export const updatePacker = (req, res) => {
    Packer.findOneAndUpdate({ _id: req.body._id }, req.body, { new: false, useFindAndModify: false }, (err, packer) => {
        if (err) {
            res.status(400).json({
                message: err.toString()
            })
        } else {
            res.json({ message: "Successfully updated the packer." })
        }
    })
}

export const updatePackerPassword = async (req, res) => {
    let oldPacker = new Packer(req.body)
    if (oldPacker.password) {
        oldPacker.password = await cryptPwd(oldPacker.password)
    }
    Packer.findOneAndUpdate({ _id: req.body._id }, oldPacker, { new: false, useFindAndModify: false }, (err, packer) => {
        if (err) {
            res.status(400).json({
                message: err.toString()
            })
        } else {
            res.json({ message: "Successfully updated the packer password." })
        }
    })
}


export const createPacker = async(req, res) => {
    let newPacker = new Packer(req.body)
    if (newPacker.password) {
        newPacker.password = await cryptPwd(newPacker.password)
    }
    newPacker.save()
        .then(packer => {
            res.send(packer)
        })
        .catch(err => {
            res.status(400).json({
                message: err.toString()
            });
        })
};

export const deletePacker = (req, res) => {
    Packer.remove({ _id: req.params.PackerID }, (err, packer) => {
        if (err) {
            res.status(400).json({
                message: err.toString()
            })
        } else {
            res.json({ message: "Successfully deleted the packer." })
        }
    })
}