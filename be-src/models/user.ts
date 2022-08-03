// import { Model, DataTypes } from "sequelize";
// import { sequelize } from "./connection";
const Model = require("sequelize");
const DataTypes = require("sequelize");
const sequelize = require("./connection");

export class User extends Model {}

User.init(
	{
		fullName: DataTypes.STRING,
		email: DataTypes.STRING,
	},
	{ sequelize, modelName: "user" }
);
