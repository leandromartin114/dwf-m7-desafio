import { Router } from "@vaadin/router";
import { state } from "../../state";
import Swal from "sweetalert2";
class InfoPage extends HTMLElement {
	constructor() {
		super();
	}
	shadow = this.attachShadow({ mode: "open" });
	connectedCallback() {
		this.render();
	}
	addListeners() {
		const currentState = state.getState();
		const formInfoEl = this.shadow.querySelector(".form");
		formInfoEl.addEventListener("send", (e: any) => {
			const target = e.detail;
			const infoForReport = {
				fullName: target.name,
				phoneNumber: target.phone,
				placeDescription: target.location,
			};
			currentState.pets.find((p) => {
				if (p.objectID == currentState.petId) {
					infoForReport["email"] = p.email;
					infoForReport["petName"] = p.name;
				}
			});
			currentState.petReportInfo = infoForReport;
			state.setState(currentState);
			state.reportInfoAboutAPet();
			Swal.fire({
				title: "¡Gracias!",
				text: "Enviamos la información que nos dejaste para ayudarnos a encontrar esta mascota",
				icon: "success",
				confirmButtonColor: "rgb(128, 38, 212)",
			});
			Router.go("/home");
		});
	}
	render() {
		const div = document.createElement("div");
		const style = document.createElement("style");
		div.innerHTML = `
                    <my-text class="title" tag="h1">Reportar info de mascota</my-text>
                    <form-info class="form"></form-info>
                `;
		div.classList.add("content");
		style.innerHTML = `
                .content{
                    padding: 0 20px;
                    width: 100%;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    align-items: center;
                }
                .title{
                    max-width: 350px;
                    height: 200px;
                    display: flex;
                    align-items: center;
                }
                `;
		this.shadow.appendChild(div);
		this.shadow.appendChild(style);
		this.addListeners();
	}
}
customElements.define("info-page", InfoPage);
