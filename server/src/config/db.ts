import { Sequelize,DataTypes } from "sequelize"

import dotenv from "dotenv"
dotenv.config()

const POSTGRES_URL =process.env.DATABASE_URL as unknown as string;

const sequelize = new Sequelize(POSTGRES_URL)
const connectDb=async()=>{
    try {
      await sequelize.authenticate()
        console.log("connection established successfully")
    
    } catch (error) {
        console.log("Unable to connect with database",error)
    }
}

export{connectDb,sequelize,Sequelize,DataTypes}