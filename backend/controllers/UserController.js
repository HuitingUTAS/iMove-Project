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
    const created_hash = await cryptPwd(req.params.pwd);
    res.send(created_hash);    
}

// function cryptPwd(pwd) {
//     const myPlaintextPassword = pwd;
//     var created_hash = 'no';
//     var message = {
//         'hash':'',
//         'created_hash':'',
//         'compare':false,
//     }

//     // bcrypt.hash(myPlaintextPassword, saltRounds, function(err, hash) {
//     //     created_hash = hash;
//     //     message['hash'] = hash;
//     //     message['created_hash'] = created_hash;
//     //     return 'asdgrth';

//     //     // bcrypt.compare(myPlaintextPassword, created_hash, function(err, result) {
//     //     //     message['compare'] = true;
//     //     //     res.send(message);
//     //     // });
//     // });

//     bcrypt
//     .hash(myPlaintextPassword, saltRounds)
//     .then(hash => {
//         return hash;
//     })
//     .catch(err => console.error(err.message))
    
// }


export const cryptPwd = async(plainPwd) => {
    const hash = await bcrypt.hash(plainPwd, saltRounds);
    return hash;
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
