import { Sequelize } from "sequelize";
import "dotenv/config";
// const username = process.env.SEQUELIZE_CREDS_USERNAME;
// const password = process.env.SEQUELIZE_CREDS_PASSWORD;
// const database = process.env.SEQUELIZE_CREDS_DATABASE;
// const host = process.env.SEQUELIZE_CREDS_HOST;

export const sequelize = new Sequelize({
	dialect: "postgres",
	username: process.env.SEQUELIZE_CREDS_USERNAME,
	password: process.env.SEQUELIZE_CREDS_PASSWORD,
	database: process.env.SEQUELIZE_CREDS_DATABASE,
	port: 5432,
	host: process.env.SEQUELIZE_CREDS_HOST,
	ssl: true,
	dialectOptions: {
		ssl: {
			require: true,
			rejectUnauthorized: false,
		},
	},
});
sequelize.authenticate();
