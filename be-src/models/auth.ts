import { Model, DataTypes } from "sequelize";
import { sequelize } from "./connection";

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
