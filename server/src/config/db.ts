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


// //b using cloud database with neon.tech
// const POSTGRES_URL =process.env.DATABASE_URL as unknown as string;
// //  string from cloud
// const sequelize = new Sequelize(POSTGRES_URL,{
//         dialect:"postgres",
//dialectOptions:{
//     ssl:{
//         rejectUnauthorized:false,
//         require:true
//    },
//},
// });
// const connectDb=async()=>{
//     try {
//       await sequelize.authenticate()
//         console.log("connection established successfully")
    
//     } catch (error) {
//         console.log("Unable to connect with database",error)
//     }
// }

// export{connectDb,sequelize,Sequelize,DataTypes}