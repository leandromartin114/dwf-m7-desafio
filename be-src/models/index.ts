// import { User } from "./user";
// import { Auth } from "./auth";
// import { Pet } from "./pet";
// import { Report } from "./report";
const User = require("./user");
const Auth = require("./auth");
const Pet = require("./pet");
const Report = require("./report");

Auth.belongsTo(User);
Pet.belongsTo(User);
User.hasMany(Pet);
Pet.hasMany(Report);

export { User, Auth, Pet, Report };
