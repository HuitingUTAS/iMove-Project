import express from 'express'
import cors from 'cors'
import dotenv  from "dotenv"
import { loginUser, getPwd } from "./controllers/UserController.js"
import { getOrderByOrderNumber, getUnallocatedOrder, getAllocatedOrder } from "./controllers/OrderController.js"
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

app.route("/loginPage")
    .post(loginUser)

app.route("/pwd")
    .get(getPwd)

app.route("/order/:orderNumber")
    .get(getOrderByOrderNumber)
    // .post(updateOrder)

app.route("/DispatchPage/FetchUnallocatedOrder")
    .get(getUnallocatedOrder)

app.route("/DispatchPage/FetchAllocatedOrder")
    .get(getAllocatedOrder)  

app.listen(port, () => {
    console.log(`iMove Backend is listening on port: ${port}`)
})