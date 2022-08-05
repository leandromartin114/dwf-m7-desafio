import { Model, DataTypes } from "sequelize";
import { sequelize } from "./connection";
// const Model = require("sequelize");
// const DataTypes = require("sequelize");
// const sequelize = require(__dirname + "/be-src/models/connection");

export const Auth = sequelize.define("auth", {
	email: DataTypes.STRING,
	password: DataTypes.STRING,
	userId: DataTypes.INTEGER,
});

// export class Auth extends Model {}

// Auth.init(
// 	{
// 		email: DataTypes.STRING,
// 		password: DataTypes.STRING,
// 		userId: DataTypes.INTEGER,
// 	},
// 	{ sequelize, modelName: "auth" }
// );
