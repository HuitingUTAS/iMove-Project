import dotenv  from "dotenv"
import mongoose from "mongoose"
import { customerSchema } from "../models/Customer.js"

dotenv.config() // load env file

const Customer = mongoose.model("Customer", customerSchema);


