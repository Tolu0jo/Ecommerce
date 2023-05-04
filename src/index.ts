import express,{Request,Response} from "express"
import logger from 'morgan'
import cookieParser from "cookie-parser"
import dotenv from 'dotenv'
import cors from 'cors'

dotenv.config();

const app = express()

app.use(express.json());
app.use(logger("dev"));
app.use(cookieParser())
app.use(cors({
    origin: "*"
}))

const port = 4000

app.listen(port,()=>{
    console.log(`Server running on http://localhost:${port}`)
})