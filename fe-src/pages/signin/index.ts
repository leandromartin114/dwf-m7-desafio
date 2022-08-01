import { Router } from "@vaadin/router";
import { state } from "../../state";
import Swal from "sweetalert2";
class SigninPage extends HTMLElement {
	constructor() {
		super();
	}
	shadow = this.attachShadow({ mode: "open" });
	connectedCallback() {
		this.render();
	}
	addListeners() {
		const signinFormEl = this.shadow.querySelector(".form");
		signinFormEl.addEventListener("send", (e: any) => {
			const target = e.detail;
			state.setEmail(target.text);
			state.findUser(() => {
				const currentState = state.getState();
				if (currentState.exist == "ok") {
					Router.go("/pass");
				} else {
					Swal.fire({
						title: "Email no encontrado",
						text: "Por favor regístrate en nuestra web para poder reportar una mascota",
						icon: "warning",
						confirmButtonColor: "rgb(128, 38, 212)",
					});
					Router.go("/signup");
				}
			});
		});
	}
	render() {
		const div = document.createElement("div");
		const style = document.createElement("style");
		div.innerHTML = `
                    <my-text class="title" tag="h1">Ingresar</my-text>
                    <form-signin tag="mail" class="form"></form-signin>
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
				.form{
					width: 300px;
				}
				@media (min-width: 969px){
                    .form{
                        width: 350px;
                    }
                
                `;
		this.shadow.appendChild(div);
		this.shadow.appendChild(style);
		this.addListeners();
	}
}
customElements.define("signin-page", SigninPage);
