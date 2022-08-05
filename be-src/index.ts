import * as express from "express";
import * as path from "path";
import * as cors from "cors";
import * as bodyParser from "body-parser";
import * as jwt from "jsonwebtoken";
import "dotenv/config";
import {
	findOrCreateUser,
	findUser,
	generateToken,
	getUserData,
	updateUser,
} from "./controllers/user-controller";
import {
	createPet,
	uptadePet,
	getAllMyPets,
	getPetsNearBy,
} from "./controllers/pet-controller";
import { createReport } from "./controllers/report-controller";

const app = express();
const PORT = process.env.PORT || 3000;
const SECRET = process.env.JWT_SECRET;
const staticDir = path.resolve(__dirname + "/dist/index.html");

app.use(express.json({ limit: "50mb" }));
// app.use(
// 	bodyParser.json({
// 		limit: "50mb",
// 	})
// );
app.use(cors());

//find user for signin
app.post("/auth", async (req, res) => {
	const existingUser = await findUser(req.body).catch((error) => {
		res.status(400).json(error);
	});
	res.status(200).json(existingUser);
});
//signup
app.post("/signup", async (req, res) => {
	const user = await findOrCreateUser(req.body).catch((error) => {
		res.status(400).json(error);
	});
	res.status(200).json(user);
});
//signin
app.post("/auth/token", async (req, res) => {
	const token = await generateToken(req.body).catch((error) => {
		res.status(401).json("email or pass incorrect " + error);
	});
	res.status(200).json(token);
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
	const user = await getUserData(req._user.id).catch((error) => {
		res.status(400).json(error);
	});
	res.status(200).json(user);
});
//update user data
app.put("/user/update", authMid, async (req, res) => {
	const userUpdated = await updateUser(req._user.id, req.body).catch(
		(error) => {
			res.status(400).json(error);
		}
	);
	res.status(200).json(userUpdated);
});
//report new pet
app.post("/pet/new", authMid, async (req, res) => {
	const newPet = await createPet(req._user.id, req.body).catch((error) => {
		res.status(400).json(error);
	});
	res.status(200).json(newPet);
});
//edit pet
app.put("/pet/update/:id", authMid, async (req, res) => {
	const petUpdated = await uptadePet(req.params.id, req.body).catch((error) => {
		res.status(400).json(error);
	});
	res.status(200).json(petUpdated);
});
//get all my pets
app.get("/pets", authMid, async (req, res) => {
	const myPetsReported = await getAllMyPets(req._user.id).catch((error) => {
		res.status(400).json(error);
	});
	res.status(200).json(myPetsReported);
});
//get pets near a location
app.get("/pets-near-by", async (req, res) => {
	const petsFinded = await getPetsNearBy(req.query).catch((error) => {
		res.status(400).json(error);
	});
	res.status(200).json(petsFinded);
});
//create report about a pet
app.post("/report/:id", async (req, res) => {
	const report = await createReport(req.params.id, req.body).catch((error) => {
		res.status(400).json(error);
	});
	res.status(200).json(report);
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
