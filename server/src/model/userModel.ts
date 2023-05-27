import { DataTypes, Model } from "sequelize";
//import { db } from "../config";
import { sequelize } from "../config/db";

export interface UserAttributes {
  dataValues: any;
  id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  address: string;
  phone: string;
  otp: number;
  otp_expiry: Date;
  lng: number;
  lat: number;
  verified: boolean;
  salt: string;
  role: string;
}

// export class UserInstance extends Model<UserAttributes> {}
const UserModel= sequelize.define('User',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    otp: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    otp_expiry: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    lng: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    lat: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    verified: {
      type: DataTypes.BOOLEAN,
      defaultValue:false
    },
    salt:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false,
    }
  },
  
);

export default UserModel