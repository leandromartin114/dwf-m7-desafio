import { Router } from "@vaadin/router";
import { state } from "../../state";
import Swal from "sweetalert2";
class PassPage extends HTMLElement {
	constructor() {
		super();
	}
	shadow = this.attachShadow({ mode: "open" });
	connectedCallback() {
		this.render();
	}
	addListeners() {
		const passFormEl = this.shadow.querySelector(".form");
		passFormEl.addEventListener("send", (e: any) => {
			const target = e.detail;
			state.setPassword(target.text);
			state.signinAndGetToken(() => {
				const currentState = state.getState();
				if (
					currentState.token.includes("invalid password") ||
					currentState.token == ""
				) {
					Swal.fire({
						title: "Contraseña incorrecta",
						text: "Por favor vuelve a ingresar la contraseña",
						icon: "warning",
						confirmButtonColor: "rgb(128, 38, 212)",
					});
				} else {
					if (currentState.link == "/mydata") {
						Router.go(currentState.link);
					}
					if (currentState.link == "/pets") {
						Router.go(currentState.link);
					}
					if (currentState.link == "/report") {
						Router.go(currentState.link);
					}
				}
			});
		});
	}
	render() {
		const div = document.createElement("div");
		const style = document.createElement("style");
		div.innerHTML = `
                    <my-text class="title" tag="h1">Ingresar</my-text>
                    <form-signin tag="pass" class="form"></form-signin>
                `;
		div.classList.add("content");
		style.innerHTML = `
                .content{
					box-sizing: border-box;
                    padding: 0 20px;
                    width: 100%;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-around;
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
customElements.define("pass-page", PassPage);
