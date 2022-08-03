// import * as express from "express";
// import * as path from "path";
// import * as cors from "cors";
// import * as jwt from "jsonwebtoken";
// import "dotenv/config";
// import {
// 	findOrCreateUser,
// 	findUser,
// 	generateToken,
// 	getUserData,
// 	updateUser,
// } from "./controllers/user-controller";
// import {
// 	createPet,
// 	uptadePet,
// 	getAllMyPets,
// 	getPetsNearBy,
// } from "./controllers/pet-controller";
// import { createReport } from "./controllers/report-controller";
const express = require("express");
const path = require("path");
const cors = require("cors");
const jwt = require("jsonwebtoken");
require("dotenv/config");
const {
	findOrCreateUser,
	findUser,
	generateToken,
	getUserData,
	updateUser,
} = require("./controllers/user-controller");
const {
	createPet,
	uptadePet,
	getAllMyPets,
	getPetsNearBy,
} = require("./controllers/pet-controller");
const createReport = require("./controllers/report-controller");

const app = express();
const PORT = process.env.PORT || 3000;
const SECRET = process.env.JWT_SECRET;
const staticDir = path.resolve(__dirname + "/dist/index.html");

app.use(express.json({ limit: "50mb" }));
app.use(cors());

//find user for signin
app.post("/auth", async (req, res) => {
	if (!req.body) {
		return res.status(400).json("There isn't body data");
	} else {
		try {
			const existingUser = await findUser(req.body);
			return res.status(200).json(existingUser);
		} catch (error) {
			return res.status(400).json(error);
		}
	}
});
//signup
app.post("/signup", async (req, res) => {
	if (!req.body) {
		return res.status(400).json("There isn't body data");
	} else {
		try {
			const user = await findOrCreateUser(req.body);
			return res.status(200).json(user);
		} catch (error) {
			return res.status(400).json(error);
		}
	}
});
//signin
app.post("/auth/token", async (req, res) => {
	if (!req.body) {
		return res.status(400).json("There isn't body data");
	} else {
		try {
			const token = await generateToken(req.body);
			return res.status(200).json(token);
		} catch (error) {
			return res.status(401).json("email or pass incorrect " + error);
		}
	}
});
//authorization midleware
function authMid(req, res, next) {
	const token = req.headers.authorization.split(" ")[1];
	try {
		const data = jwt.verify(token, SECRET);
		req._user = data;
		next();
	} catch (error) {
		res.status(401).json(error);
	}
}
//getting the user data with the mid function
app.get("/user", authMid, async (req, res) => {
	try {
		const user = await getUserData(req._user.id);
		res.status(200).json(user);
	} catch (error) {
		res.status(400).json(error);
	}
});
//update user data
app.put("/user/update", authMid, async (req, res) => {
	try {
		const userUpdated = await updateUser(req._user.id, req.body);
		res.status(200).json(userUpdated);
	} catch (error) {
		res.status(400).json(error);
	}
});
//report new pet
app.post("/pet/new", authMid, async (req, res) => {
	try {
		const newPet = await createPet(req._user.id, req.body);
		res.status(200).json(newPet);
	} catch (error) {
		res.status(400).json(error);
	}
});
//edit pet
app.put("/pet/update/:id", authMid, async (req, res) => {
	try {
		const petUpdated = await uptadePet(req.params.id, req.body);
		res.status(200).json(petUpdated);
	} catch (error) {
		res.status(400).json(error);
	}
});
//get all my pets
app.get("/pets", authMid, async (req, res) => {
	try {
		const myPetsReported = await getAllMyPets(req._user.id);
		res.status(200).json(myPetsReported);
	} catch (error) {
		res.status(400).json(error);
	}
});
//get pets near a location
app.get("/pets-near-by", async (req, res) => {
	try {
		const petsFinded = await getPetsNearBy(req.query);
		res.status(200).json(petsFinded);
	} catch (error) {
		res.status(400).json(error);
	}
});
//create report about a pet
app.post("/report/:id", async (req, res) => {
	try {
		const report = await createReport(req.params.id, req.body);
		res.status(200).json(report);
	} catch (error) {
		res.status(400).json(error);
	}
});

//listen
app.listen(PORT, () => {
	console.log("App listening on port " + PORT);
});
//serving front
app.use(express.static("dist"));

app.get("*", (req, res) => {
	res.sendFile(path.join(staticDir));
});
