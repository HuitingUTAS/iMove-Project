import express from 'express'
import cors from 'cors'
import dotenv  from "dotenv"
import { loginUser, getPwd } from "./controllers/UserController.js"
import { getOrderByOrderNumber, getUnallocatedOrder, getAllocatedOrder } from "./controllers/OrderController.js"
import { createItem } from "./controllers/ItemController.js"
import { getOneOrAllCar, updateCar, createCar, deleteCar } from "./controllers/CarController.js"
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

app.get("/pwd", getPwd)

app.get("/order/:orderNumber", getOrderByOrderNumber)

app.get("/DispatchPage/FetchUnallocatedOrder", getUnallocatedOrder)

app.get("/DispatchPage/FetchAllocatedOrder", getAllocatedOrder)

app.post("/DispatchPage/InsertingItem", createItem)

app.get("/CarManagement/FetchingCar/:CarID", getOneOrAllCar)
app.put("/CarManagement/UpdatingCar", updateCar)
app.post("/CarManagement/InsertingCar", createCar)
app.delete("/CarManagement/DeletingCar/:CarID", deleteCar)

app.listen(port, () => {
    console.log(`iMove Backend is listening on port: ${port}`)
})