import dotenv  from "dotenv"
import mongoose from "mongoose"
import { driverSchema } from "../models/Driver.js"

dotenv.config() // load env file

const Driver = mongoose.model("Driver", driverSchema);


export const getDriverByNumber = (req, res) => {
    Driver.find({ name:{$regex : new RegExp(req.params.DriverName, 'i')}} ,
    function(err, driver) {
        if (err) {
            res.status(400).json({
                message: err.toString()
            })
        }
        else {
            res.send(driver)
        }
    });
};


export const updateDriver = (req, res) => {
    Driver.findOneAndUpdate({ _id: req.body._id }, req.body, { new: false, useFindAndModify: false }, (err, driver) => {
        if (err) {
            res.status(400).json({
                message: err.toString()
            })
        } else {
            res.json({ message: "Successfully updated the driver." })
        }
    })
}

export const updateDriverPassword = async (req, res) => {
    let oldDriver = new Driver(req.body)
    if (oldDriver.password) {
        oldDriver.password = await cryptPwd(oldDriver.password)
    }
    Driver.findOneAndUpdate({ _id: req.body._id }, oldDriver, { new: false, useFindAndModify: false }, (err, driver) => {
        if (err) {
            res.status(400).json({
                message: err.toString()
            })
        } else {
            res.json({ message: "Successfully updated the driver password." })
        }
    })
}


export const createDriver = (req, res) => {
    let newDriver = new Driver(req.body)
    newDriver.save()
        .then(driver => {
            res.send(driver)
        })
        .catch(err => {
            res.status(400).json({
                message: err.toString()
            });
        })
};

export const deleteDriver = (req, res) => {
    Driver.remove({ _id: req.params.DriverID }, (err, driver) => {
        if (err) {
            res.status(400).json({
                message: err.toString()
            })
        } else {
            res.json({ message: "Successfully deleted the driver." })
        }
    })
}