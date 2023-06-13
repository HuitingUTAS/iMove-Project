import dotenv  from "dotenv"
import mongoose from "mongoose"
import { orderSchema } from "../models/Order.js"
import { dispatcherSchema } from "../models/Dispatcher.js"
import { packerSchema } from "../models/Packer.js"
import { driverSchema } from "../models/Driver.js"

dotenv.config() // load env file

const Driver = mongoose.model("Driver", orderSchema);


