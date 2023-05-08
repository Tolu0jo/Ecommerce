"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
//import { db } from "../config";
const db_1 = require("../config/db");
// export interface UserAttributes {
//   id: string;
//   email: string;
//   password: string;
//   firstName: string;
//   lastName: string;
//   address: string;
//   phone: string;
//   otp: number;
//   otp_expiry: Date;
//   lng: number;
//   lat: number;
//   verified: boolean;
//   salt: string;
//   role: string;
// }
// export class UserInstance extends Model<UserAttributes> {}
const UserModel = db_1.sequelize.define('User', {
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    firstName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    lastName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    address: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    phone: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    otp: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    otp_expiry: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    lng: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false,
    },
    lat: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false,
    },
    verified: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false
    },
    salt: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    }
});
exports.default = UserModel;
