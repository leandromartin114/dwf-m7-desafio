import * as crypto from "crypto";
import * as jwt from "jsonwebtoken";
import { Auth } from "../models";
import { User } from "../models";
// const crypto = require("crypto");
// const jwt = require("jsonwebtoken");
// const Auth = require(__dirname + "/be-src/models");
// const User = require(__dirname + "/be-src/models");

const SECRET = process.env.JWT_SECRET;

//generate the encripted pass
function getSHA256ofString(text) {
	return crypto.createHash("sha256").update(text).digest("hex");
}

//find user by email
export async function findUser(data) {
	const userFinded = await User.findOne({
		where: { email: data.email },
	});
	if (userFinded) {
		return userFinded;
	} else {
		console.error("User don't exist");
	}
}
//create user and his auth element if it doesn't exist
export async function findOrCreateUser(bodyData) {
	const { email, fullName, password } = bodyData;
	const [user, created] = await User.findOrCreate({
		where: { email: email },
		defaults: {
			email,
			fullName,
		},
	});
	const [auth, authCreated] = await Auth.findOrCreate({
		where: { userId: user.get("id") },
		defaults: {
			email,
			password: getSHA256ofString(password),
			userId: user.get("id"),
		},
	});
	return user;
}
//generate the token for validation
export async function generateToken(bodyData) {
	const { email, password } = bodyData;
	const passwordHash = getSHA256ofString(password);
	const auth = await Auth.findOne({
		where: {
			email,
			password: passwordHash,
		},
	});
	const token = jwt.sign({ id: auth.get("userId") }, SECRET);
	return token;
}
//getting the user data
export async function getUserData(userId: number) {
	const user = await User.findByPk(userId);
	return user;
}
//updating a user
export async function updateUser(userId: number, data) {
	const dataForUser = {
		fullName: data.fullName,
		email: data.email,
	};
	const passwordHash = getSHA256ofString(data.password);
	const dataForAuth = {
		fullName: data.fullName,
		email: data.email,
		password: passwordHash,
	};
	const userUpdated = await User.update(dataForUser, {
		where: { id: userId },
	});
	const authUpdated = await Auth.update(dataForAuth, {
		where: { userId: userId },
	});
	return userUpdated;
}
