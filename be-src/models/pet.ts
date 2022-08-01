import { Model, DataTypes } from "sequelize";
import { sequelize } from "./connection";

export class Pet extends Model {}

Pet.init(
	{
		name: DataTypes.STRING,
		description: DataTypes.STRING,
		imgURL: DataTypes.STRING,
		location: DataTypes.STRING,
		lat: DataTypes.FLOAT,
		lng: DataTypes.FLOAT,
		state: DataTypes.STRING,
		email: DataTypes.STRING,
		userId: DataTypes.INTEGER,
	},
	{ sequelize, modelName: "pet" }
);
