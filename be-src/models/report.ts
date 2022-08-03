// import { Model, DataTypes } from "sequelize";
// import { sequelize } from "./connection";
const Model = require("sequelize");
const DataTypes = require("sequelize");
const sequelize = require("./connection");

export class Report extends Model {}

Report.init(
	{
		fullName: DataTypes.STRING,
		phoneNumber: DataTypes.BIGINT,
		placeDescription: DataTypes.STRING,
		petId: DataTypes.INTEGER,
	},
	{ sequelize, modelName: "report" }
);
