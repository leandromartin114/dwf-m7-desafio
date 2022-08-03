// import { Model, DataTypes } from "sequelize";
// import { sequelize } from "./connection";
const Model = require("sequelize");
const DataTypes = require("sequelize");
const sequelize = require("./connection");

export class Auth extends Model {}

Auth.init(
	{
		email: DataTypes.STRING,
		password: DataTypes.STRING,
		userId: DataTypes.INTEGER,
	},
	{ sequelize, modelName: "auth" }
);
