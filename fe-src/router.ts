import { Router } from "@vaadin/router";

const router = new Router(document.querySelector(".root"));
router.setRoutes([
	{ path: "/", component: "home-page" },
	{ path: "/home", component: "home-page" },
	{ path: "/signin", component: "signin-page" },
	{ path: "/pass", component: "pass-page" },
	{ path: "/signup", component: "signup-page" },
	{ path: "/mydata", component: "mydata-page" },
	{ path: "/report", component: "report-page" },
	{ path: "/edit", component: "edit-page" },
	{ path: "/pets", component: "pets-page" },
	{ path: "/info", component: "info-page" },
]);
