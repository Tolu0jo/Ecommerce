import express,{Request,Response} from "express"
import logger from 'morgan'
import cookieParser from "cookie-parser"
import dotenv from 'dotenv'
import cors from 'cors'
//import{db} from "./config/index"
import buyerRouter from "./routes/buyerRoute"
import { connectDb, sequelize } from "./config/db"
dotenv.config();

// db.sync().then(()=>{
//     console.log("Database connected Successfully...")
// }).catch(err=>{
//     console.log(err)
// })
const app = express()

app.use(express.json());
app.use(logger("dev"));
app.use(cookieParser())
app.use(cors({
    origin: "*"
}))

app.use("/user",buyerRouter)

const port = 5000

app.listen(port,async()=>{
    await connectDb()
     sequelize.sync({force:false}).then(()=>{
        console.log("Database Synced Successfully...")
    })
    console.log(`Server running on http://localhost:${port}`)
})