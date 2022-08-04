const dev = process.env.NODE_ENV == "development";
let api = process.env.API_BASE_URL;
// let API_BASE_URL = "https://dwf-m7-petfinder.herokuapp.com";
// if (dev) {
// 	API_BASE_URL = "http://localhost:3000";
// }
export const state = {
	data: {
		userId: "",
		email: "",
		password: "",
		fullName: "",
		token: "",
		petId: "",
		lat: "",
		lng: "",
		link: "",
		petData: {},
		myPets: [],
		pets: [],
		petReportInfo: {},
	},
	listeners: [],
	initState() {
		const stateFromStorage = JSON.parse(localStorage.getItem("petfinder"));
		if (stateFromStorage != null) {
			this.setState(stateFromStorage);
		} else {
			this.setState(this.getState());
		}
	},
	getState() {
		return this.data;
	},
	setState(newState) {
		this.data = newState;
		for (const cb of this.listeners) {
			cb();
		}
		localStorage.setItem("petfinder", JSON.stringify(newState));
	},
	subscribe(callback: (any) => any) {
		this.listeners.push(callback);
	},
	resetToken() {
		const currentState = this.getState();
		currentState.token = "";
		this.setState(currentState);
	},
	//set some user parameters
	setEmail(email: string) {
		const currentState = this.getState();
		currentState.email = email;
		this.setState(currentState);
	},
	setPassword(pass: string) {
		const currentState = this.getState();
		currentState.password = pass;
		this.setState(currentState);
	},
	setFullNameAndPass(fullName: string, password: string) {
		const currentState = this.getState();
		currentState.fullName = fullName;
		currentState.password = password;
		this.setState(currentState);
	},
	//find the email in an existing user for signin
	getUser(callback) {
		const currentState = this.getState();
		const email = currentState.email;
		if (email) {
			fetch(api + "/auth", {
				method: "post",
				headers: {
					"content-type": "application/json",
				},
				body: JSON.stringify({
					email,
				}),
			})
				.then((res) => {
					return res.json();
				})
				.then((data) => {
					if (data) {
						currentState.exist = "ok";
						this.setState(currentState);
						callback();
					} else {
						console.error("No data from getUser");
					}
				});
		} else {
			console.error("There isn't data in state");
		}
	},
	//find or create a user for signup
	createUser(callback) {
		const currentState = this.getState();
		const fullName = currentState.fullName;
		const email = currentState.email;
		const password = currentState.password;
		if (fullName && email && password) {
			fetch(api + "/signup", {
				method: "post",
				headers: {
					"content-type": "application/json",
				},
				body: JSON.stringify({
					email,
					fullName,
					password,
				}),
			})
				.then((res) => {
					return res.json();
				})
				.then((data) => {
					currentState.userId = data.id;
					this.setState(currentState);
					callback();
				});
		} else {
			console.error("There isn't data in state");
		}
	},
	//log the user generating a token
	signinAndGetToken(callback) {
		const currentState = this.getState();
		const email = currentState.email;
		const password = currentState.password;
		if (email && password) {
			fetch(api + "/auth/token", {
				method: "post",
				headers: {
					"content-type": "application/json",
				},
				body: JSON.stringify({
					email,
					password,
				}),
			})
				.then((res) => {
					return res.json();
				})
				.then((data) => {
					currentState.token = data;
					this.setState(currentState);
					callback();
				});
		} else {
			console.error("There isn't data in state");
		}
	},
	//getting the user data
	getUserData(callback) {
		const currentState = this.getState();
		const token = currentState.token;
		if (token) {
			fetch(api + "/user", {
				method: "get",
				headers: {
					"content-type": "application/json",
					authorization: "bearer " + token,
				},
			})
				.then((res) => {
					return res.json();
				})
				.then((data) => {
					currentState.userId = data.id;
					currentState.fullName = data.fullName;
					currentState.email = data.email;
					this.setState(currentState);
					callback();
				});
		} else {
			console.error("There isn't token in state");
		}
	},
	//updating the user data
	updateUserData(bodyData: {}, callback) {
		const currentState = this.getState();
		const token = currentState.token;
		if (token) {
			fetch(api + "/user/update", {
				method: "put",
				headers: {
					"content-type": "application/json",
					authorization: "bearer " + token,
				},
				body: JSON.stringify(bodyData),
			})
				.then((res) => {
					return res.json();
				})
				.then((data) => {
					console.log("User updated");
					callback();
				});
		} else {
			console.error("Something goes wrong");
		}
	},
	//report a new lost pet
	reportLostPet(callback) {
		const currentState = this.getState();
		const token = currentState.token;
		const petData = currentState.petData;
		if (petData) {
			fetch(api + "/pet/new", {
				method: "post",
				headers: {
					"content-type": "application/json",
					authorization: "bearer " + token,
				},
				body: JSON.stringify({
					name: petData.name,
					description: petData.description,
					imgURL: petData.imgURL,
					location: petData.location,
					lat: petData.lat,
					lng: petData.lng,
					state: "LOST",
					email: currentState.email,
				}),
			})
				.then((res) => {
					return res.json();
				})
				.then((data) => {
					console.log(data);
					callback();
				});
		} else {
			console.error("There isn't petData in state");
		}
	},
	//updating an existing pet reported
	updatePetData(callback) {
		const currentState = this.getState();
		const token = currentState.token;
		const petId = currentState.petId;
		const petData = currentState.petData;
		if (petData) {
			fetch(api + "/pet/update/" + petId, {
				method: "put",
				headers: {
					"content-type": "application/json",
					authorization: "bearer " + token,
				},
				body: JSON.stringify({
					name: petData.name,
					description: petData.description,
					imgURL: petData.imgURL,
					location: petData.location,
					lat: petData.lat,
					lng: petData.lng,
					state: petData.state,
					email: petData.email,
				}),
			})
				.then((res) => {
					return res.json();
				})
				.then((data) => {
					console.log(data);
					callback();
				});
		} else {
			console.error("There isn't petData in state");
		}
	},
	//get all pets reported by userId
	getAllMyPets(callback) {
		const currentState = this.getState();
		const token = currentState.token;
		if (token) {
			fetch(api + "/pets", {
				method: "get",
				headers: {
					"content-type": "application/json",
					authorization: "bearer " + token,
				},
			})
				.then((res) => {
					return res.json();
				})
				.then((data) => {
					currentState.myPets = data;
					this.setState(currentState);
					callback();
				});
		} else {
			console.error("There isn't token in state");
		}
	},
	//get all the pets reported in the area
	getPetsNearBy(callback) {
		const currentState = this.getState();
		const lat = currentState.lat;
		const lng = currentState.lng;
		if (lat && lng) {
			fetch(api + "/pets-near-by?lat=" + lat + "&lng=" + lng)
				.then((res) => {
					return res.json();
				})
				.then((data) => {
					const result = data.filter((p) => {
						return p.state == "FINDED" || p.state == "LOST";
					});
					currentState.pets = result;
					this.setState(currentState);
					callback();
				});
		} else {
			console.error("There isn't lat and lng in state for the search");
		}
	},
	reportInfoAboutAPet() {
		const currentState = this.getState();
		const petId = currentState.petId;
		const petReportInfo = currentState.petReportInfo;
		if (petId) {
			fetch(api + "/report/" + petId, {
				method: "post",
				headers: {
					"content-type": "application/json",
				},
				body: JSON.stringify(petReportInfo),
			})
				.then((res) => {
					return res.json();
				})
				.then((data) => {
					console.log(data);
				});
		} else {
			console.error("There isn't data in the state");
		}
	},
};
