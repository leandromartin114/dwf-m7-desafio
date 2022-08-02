import "./router";
import { state } from "./state";
import "./components/button";
import "./components/form-info";
import "./components/form-signin";
import "./components/form-signup";
import "./components/header";
import "./components/text";
import "./pages/home";
import "./pages/signin";
import "./pages/pass";
import "./pages/signup";
import "./pages/my-data";
import "./pages/report";
import "./pages/edit";
import "./pages/info";
import "./pages/pets";
import "dotenv/config";
function main() {
	state.initState();
}
main();
