import { Router } from "@vaadin/router";
import { state } from "../../state";
import Swal from "sweetalert2";
class SignupPage extends HTMLElement {
	constructor() {
		super();
	}
	shadow = this.attachShadow({ mode: "open" });
	connectedCallback() {
		this.render();
	}
	addListeners() {
		const currentState = state.getState();
		const formUp: HTMLFormElement = this.shadow.querySelector(".form-signup");
		const pass: HTMLInputElement = this.shadow.querySelector(".pass");
		const passV: HTMLInputElement = this.shadow.querySelector(".passv");
		passV.addEventListener("keyup", () => {
			if (pass.value == passV.value) {
				passV.style.backgroundColor = "rgba(176, 247, 176, 0.342)";
			} else {
				passV.style.backgroundColor = "rgba(247, 176, 176, 0.342)";
			}
		});
		formUp.addEventListener("submit", (e: any) => {
			e.preventDefault();
			const data = e.target;
			currentState.fullName = data.name.value;
			currentState.email = data.email.value;
			currentState.password = data.pass.value;
			state.createUser(() => {
				Swal.fire({
					title: "Usuario creado",
					text: "Tus datos fueron guardados correctamente",
					icon: "success",
					confirmButtonColor: "rgb(128, 38, 212)",
				});
				Router.go("/signin");
			});
		});
	}
	render() {
		const div = document.createElement("div");
		const style = document.createElement("style");
		div.innerHTML = `
                    <my-text class="title" tag="h1">Registrate</my-text>
                    <form class="form-signup">
                    <label>
                        <my-text class="label" tag="p">Email</my-text>
                        <input class ="input" name="email" type="email">
                    </label>
                    <label>
                        <my-text class="label" tag="p">Nombre</my-text>
                        <input class ="input n" name="name" type="text">
                    </label>
                    <label>
                        <my-text class="label" tag="p">Contraseña</my-text>
                        <input class ="input pass" name="pass" type="password">
                    </label>
                    <label>
                        <my-text class="label" tag="p">Repetir contraseña</my-text>
                        <input class ="input passv" name="passv" type="password">
                    </label>
                    <button class="button">Enviar</button> 
                </form>
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
                .form-signup{
                    width: 300px;
                    display: grid;
                    gap: 15px;
                    justify-content: center;
                    align-items: center;
                }
                .label{
                    display: flex;
                }
                .input{
                    box-sizing: border-box;
                    font-size: 26px;
                    border: 3px solid rgb(128, 38, 212);
                    border-radius: 8px;
                    width: 100%;
                    padding: 5px 2px;
                    font-family: 'Odibee Sans', cursive;
                    font-weight: 400;
                    text-align: center;
                    color: #f0fff;
                }
                .n{
                    margin-bottom: 20px;
                }
                input::placeholder{
                    color: #ede7f6;
                }
                .input:active{
                    background-color: #ede7f6;
                }
                .input:hover{
                    background-color: #ede7f6;
                }
                .button{
                    font-size: 26px;
                    border-radius: 8px;
                    width: 100%;
                    padding: 5px 2px;
                    color: black;
                    font-family: 'Odibee Sans', cursive;
                    font-weight: 400;
                    background-color: rgb(179, 140, 216);
                    border: 3px solid rgb(128, 38, 212);
                }
                .button:active{
                    color: rgba(208, 212, 214, 0.918);
                }
                .button:hover{
                    color: rgba(208, 212, 214, 0.918);
                }
                @media (min-width: 969px){
                    .input{
                        font-size: 30px;
                        border-width: 4px;
                        padding: 7px 3px;
                    }
                    .form-signup{
                        width: 380px;
                    }
                    .button{
                        font-size: 30px;
                        border-width: 4px;
                        padding: 7px 3px;
                        cursor: pointer;
                    }
                }
                `;
		this.shadow.appendChild(div);
		this.shadow.appendChild(style);
		this.addListeners();
	}
}
customElements.define("signup-page", SignupPage);
