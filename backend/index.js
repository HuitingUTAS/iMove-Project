import express from 'express'
import cors from 'cors'
import dotenv  from "dotenv"
import { loginUser, getPwd } from "./controllers/UserController.js"
import { getOrderByOrderNumber, getUnallocatedOrder, getAllocatedOrder } from "./controllers/OrderController.js"
import { createItem } from "./controllers/ItemController.js"
import { getCarByRegistrationNumber, updateCar, createCar, deleteCar } from "./controllers/CarController.js"
import { getDriverByNumber, updateDriver, updateDriverPassword, createDriver, deleteDriver } from "./controllers/DriverController.js"
import { getDispatcherByNumber, updateDispatcher,updateDispatcherPassword, createDispatcher, deleteDispatcher } from "./controllers/DispatcherController.js"
import { getPackerByName, updatePacker,updatePackerPassword, createPacker, deletePacker } from "./controllers/PackerController.js"
import { getManagerByName, updateManager,updateManagerPassword, createManager, deleteManager } from "./controllers/ManagerController.js"
import mongoose from "mongoose"
import bodyParser from "body-parser"
import swaggerUi from 'swagger-ui-express'
import Yaml from 'yamljs'
import config from 'config'

dotenv.config() // load env file

const app = express()
const port = 3002
const swaggerDocument = Yaml.load('./swagger.yaml');
const mongoDb = process.env.MONGODB_CONNECTION_CLOUD || process.env.MONGODB_CONNECTION_LOCAL

mongoose.Promise = global.Promise
mongoose.set('strictQuery', true);
const dbConnection = mongoose.connect(`${mongoDb}/iMoveDb`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})


app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.static("views"))
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(cors())

app.route("/")
    .get(function(req, res, next) {
        res.send("Welcome iMove Backend");
    });

app.post("/loginPage", loginUser)

app.get("/pwd/:pwd", getPwd)

app.get("/order/:orderNumber", getOrderByOrderNumber)

app.get("/DispatchPage/FetchUnallocatedOrder", getUnallocatedOrder)

app.get("/DispatchPage/FetchAllocatedOrder", getAllocatedOrder)

app.post("/DispatchPage/InsertingItem", createItem)

app.get("/CarManagement/FetchingCar/:RegistrationNumber", getCarByRegistrationNumber)
app.put("/CarManagement/UpdatingCar", updateCar)
app.post("/RegistrationPage/car", createCar)
app.delete("/CarManagement/DeletingCar/:CarID", deleteCar)

app.get("/DriverManagement/FetchingDriver/:DriverName", getDriverByNumber)
app.put("/DriverManagement/UpdatingDriver", updateDriver)
app.put("/DriverManagement/UpdatingDriverPassword", updateDriverPassword)
app.post("/RegistrationPage/driver", createDriver)
app.delete("/DriverManagement/DeletingDriver/:DriverID", deleteDriver)

app.get("/DispatcherManagement/FetchingDispatcher/:DispatcherName", getDispatcherByNumber)
app.put("/DispatcherManagement/UpdatingDispatcher", updateDispatcher)
app.put("/DispatcherManagement/UpdatingDispatcherPassword", updateDispatcherPassword)
app.post("/RegistrationPage/dispatcher", createDispatcher)
app.delete("/DispatcherManagement/DeletingDispatcher/:DispatcherID", deleteDispatcher)

app.get("/PackerManagement/FetchingPacker/:PackerName", getPackerByName)
app.put("/PackerManagement/UpdatingPacker", updatePacker)
app.put("/PackerManagement/UpdatingPackerPassword", updatePackerPassword)
app.post("/RegistrationPage/packer", createPacker)
app.delete("/PackerManagement/DeletingPacker/:PackerID", deletePacker)

app.get("/ManagerManagement/FetchingManager/:ManagerName", getManagerByName)
app.put("/ManagerManagement/UpdatingManager", updateManager)
app.put("/ManagerManagement/UpdatingManagerPassword", updateManagerPassword)
app.post("/RegistrationPage/manager", createManager)
app.delete("/ManagerManagement/DeletingManager/:ManagerID", deleteManager)


app.listen(port, () => {
    console.log(`iMove Backend is listening on port: ${port}`)
})