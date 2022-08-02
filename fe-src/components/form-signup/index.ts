class FormSignup extends HTMLElement {
	constructor() {
		super();
	}
	shadow = this.attachShadow({ mode: "open" });
	connectedCallback() {
		this.render();
	}
	addListeners() {
		const password: HTMLInputElement = this.shadow.querySelector(".pass");
		const passwordV: HTMLInputElement = this.shadow.querySelector(".passv");
		passwordV.addEventListener("keyup", () => {
			if (password.value == passwordV.value) {
				passwordV.style.backgroundColor = "rgba(176, 247, 176, 0.342)";
			} else {
				passwordV.style.backgroundColor = "rgba(247, 176, 176, 0.342)";
			}
		});
		const formUp = this.shadow.querySelector(".form-signup") as HTMLFormElement;
		formUp.addEventListener("submit", (e: any) => {
			e.preventDefault();
			const data = e.target;
			const myEvent = new CustomEvent("send", {
				detail: {
					name: data.name.value,
					password: data.pass.value,
					password2: data.passv.value,
				},
			});
			this.dispatchEvent(myEvent);
			formUp.reset();
		});
	}
	render() {
		const div = document.createElement("div");
		const style = document.createElement("style");
		div.innerHTML = `
                    <form class="form-signup">
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
		style.innerHTML = `
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
                        .form-signup{
                            width: 350px;
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
customElements.define("form-signup", FormSignup);
