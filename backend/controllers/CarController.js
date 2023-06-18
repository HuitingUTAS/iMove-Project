import dotenv  from "dotenv"
import mongoose from "mongoose"
import { carSchema } from "../models/Car.js"

dotenv.config() // load env file

const Car = mongoose.model("Car", carSchema);


export const getOneOrAllCar = (req, res) => {
    Car.findById(req.params.CarID ,
    function(err, car) {
        if (err) {
            res.status(400).json({
                message: err.toString()
            })
        }
        else if (car) {
            res.send(car)
        }
        else {
            // if there's no car found, then return all cars
            Car.find({} ,
                function(err, cars) {
                    if (err) {
                        res.status(400).json({
                            message: err.toString()
                        })
                    }
                    else {
                        res.send(cars)
                    }
                }); 
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