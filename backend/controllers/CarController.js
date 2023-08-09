import dotenv  from "dotenv"
import mongoose from "mongoose"
import { carSchema } from "../models/Car.js"

dotenv.config() // load env file

const Car = mongoose.model("Car", carSchema);


export const getAllCars = (req, res) => {
    Car.find({ } ,
    function(err, car) {
        if (err) {
            res.status(400).json({
                message: err.toString()
            })
        }
        else {
            res.send(car)
        }
    });
};

export const getCarByRegistrationNumber = (req, res) => {
    Car.find({ registrationNumber:{$regex : new RegExp(req.params.RegistrationNumber, 'i')}} ,
    function(err, car) {
        if (err) {
            res.status(400).json({
                message: err.toString()
            })
        }
        else {
            res.send(car)
        }
    });
};

export const getAvaliableCars = (req, res) => {
    Car.find({ status: 'available'} ,
    function(err, car) {
        if (err) {
            res.status(400).json({
                message: err.toString()
            })
        }
        else {
            res.send(car)
        }
    });
};


export const updateCar = (req, res) => {
    Car.findOneAndUpdate({ _id: req.body._id }, req.body, { new: false, useFindAndModify: false }, (err, car) => {
        if (err) {
            res.status(400).json({
                message: err.toString()
            })
        } else {
            res.json({ message: "Successfully updated the car." })
        }
    })
}

export const createCar = (req, res) => {
    let newCar = new Car(req.body)
    newCar.save()
        .then(car => {
            res.send(car)
        })
        .catch(err => {
            res.status(400).json({
                message: err.toString()
            });
        })
};

export const deleteCar = (req, res) => {
    Car.remove({ _id: req.params.CarID }, (err, car) => {
        if (err) {
            res.status(400).json({
                message: err.toString()
            })
        } else {
            res.json({ message: "Successfully deleted the car." })
        }
    })
}