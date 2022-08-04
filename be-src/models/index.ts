import { User } from "./user";
import { Auth } from "./auth";
import { Pet } from "./pet";
import { Report } from "./report";
// const User = require(__dirname + "/be-src/models/user");
// const Auth = require(__dirname + "/be-src/models/auth");
// const Pet = require(__dirname + "/be-src/models/pet");
// const Report = require(__dirname + "/be-src/models/report");

Auth.belongsTo(User);
Pet.belongsTo(User);
User.hasMany(Pet);
Pet.hasMany(Report);

export { User, Auth, Pet, Report };
