import { state } from "../../state";
import Swal from "sweetalert2";
class MyDataPage extends HTMLElement {
	constructor() {
		super();
	}
	shadow = this.attachShadow({ mode: "open" });
	connectedCallback() {
		this.render();
	}
	addListeners() {
		const formUp = this.shadow.querySelector(".form-data") as HTMLFormElement;
		const fullName: any = formUp.name;
		state.getUserData(() => {
			const currentState = state.getState();
			formUp.email.value = currentState.email;
			fullName.value = currentState.fullName;
		});
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
			const email = data.email.value;
			const fullName = data.name.value;
			const password = data.pass.value;
			let dataToChange;
			if (password) {
				dataToChange = {
					email,
					fullName,
					password,
				};
			} else {
				dataToChange = {
					email,
					fullName,
				};
			}
			state.updateUserData(dataToChange, () => {
				Swal.fire({
					title: "Datos modificados",
					text: "Tus datos fueron guardados correctamente",
					icon: "success",
					confirmButtonColor: "rgb(128, 38, 212)",
				});
			});
		});
	}
	render() {
		const div = document.createElement("div");
		const style = document.createElement("style");
		div.innerHTML = `
                    <my-text class="title" tag="h1">Mis datos</my-text>
                    <form class="form-data">
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
                    <button class="button">Guardar</button> 
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
                .form-data{
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
                    font-size: 18px;
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
                    font-size: 20px;
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
                        font-size: 26px;
                        border-width: 4px;
                        padding: 7px 3px;
                    }
                    .form-data{
                        width: 380px;
                    }
                    .button{
                        font-size: 26px;
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
customElements.define("mydata-page", MyDataPage);
