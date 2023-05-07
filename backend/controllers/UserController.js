import dotenv  from "dotenv"
import rp from "request-promise"
import bcrypt from "bcrypt";
import mongoose from "mongoose"
import { managerSchema } from "../models/Manager.js"
import { dispatcherSchema } from "../models/Dispatcher.js"
import { packerSchema } from "../models/Packer.js"
import { driverSchema } from "../models/Driver.js"

dotenv.config() // load env file

const Manager = mongoose.model("Manager", managerSchema)
const Dispatcher = mongoose.model("Dispatcher", dispatcherSchema)
const Packer = mongoose.model("Packer", packerSchema)
const Driver = mongoose.model("Driver", driverSchema)
const saltRounds = 10;

export const getPwd = async(req, res) => {
    
    const myPlaintextPassword = '123456';
    var created_hash = '';
    var message = {
        'hash':'',
        'created_hash':'',
        'compare':false,
    }

    bcrypt.hash(myPlaintextPassword, saltRounds, function(err, hash) {
        created_hash = hash;
        message['hash'] = hash;
        message['created_hash'] = created_hash;
        res.send(message);

        // bcrypt.compare(myPlaintextPassword, created_hash, function(err, result) {
        //     message['compare'] = true;
        //     res.send(message);
        // });
    });

    
}

export const loginUser = async(req, res) => {
    try {
        const role = req.body.role;
        const username = req.body.username;
        const inputPassword = req.body.password;
        var foundUser = null;
        var resContent = {
            'message': 'Invalid username or password',
            'user': null,
            'token': '',
            'role': role,
        };

        switch (role) {
            case 'manager':
                foundUser = await Manager.findOne({ username : username });    
                break;
            case 'dispatcher':
                foundUser = await Dispatcher.findOne({ username : username });    
                break;
            case 'packer':
                foundUser = await Packer.findOne({ username : username });    
                break;
            case 'driver':
                foundUser = await Driver.findOne({ username : username });    
                break;
            default:
                foundUser = await Manager.findOne({ username : username });    
                break;
        }

        //https://medium.com/swlh/basic-login-system-with-node-js-99acf02275b9
        if (foundUser) {
            const passwordMatch = await bcrypt.compare(inputPassword, foundUser.password);
            if(passwordMatch){
                resContent['message'] = 'login successfully';
                resContent['user'] = foundUser;
            }
            res.send(resContent);
        }

    } catch (err) {
        res.status(400).json({
            message: err.toString()
        })
    }
};
