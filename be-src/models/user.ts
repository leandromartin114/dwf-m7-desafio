import { Model, DataTypes } from "sequelize";
import { sequelize } from "./connection";

export class User extends Model {}

User.init(
	{
		fullName: DataTypes.STRING,
		email: DataTypes.STRING,
	},
	{ sequelize, modelName: "user" }
);

// const Model = require("sequelize");
// const DataTypes = require("sequelize");
// const sequelize = require(__dirname + "/be-src/models/connection");

// export const User = sequelize.define("user", {
// 	fullName: DataTypes.STRING,
// 	email: DataTypes.STRING,
// });
