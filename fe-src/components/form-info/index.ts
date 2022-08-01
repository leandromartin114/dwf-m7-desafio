class FormInfo extends HTMLElement {
	constructor() {
		super();
	}
	shadow = this.attachShadow({ mode: "open" });
	connectedCallback() {
		this.render();
	}
	addListeners() {
		const formInfo = this.shadow.querySelector(".form-info") as HTMLFormElement;
		formInfo.addEventListener("submit", (e: any) => {
			e.preventDefault();
			const data = e.target;
			const myEvent = new CustomEvent("send", {
				detail: {
					name: data.name.value,
					phone: data.phone.value,
					location: data.location.value,
				},
			});
			this.dispatchEvent(myEvent);
			formInfo.reset();
		});
	}
	render() {
		const div = document.createElement("div");
		const style = document.createElement("style");
		div.innerHTML = `
                    <form class="form-info">
                        <label>
                            <my-text class="label" tag="p">Nombre</my-text>
                            <input class ="input" name="name" type="text">
                        </label>
                        <label>
                            <my-text class="label" tag="p">Teléfono</my-text>
                            <input class ="input" name="phone" type="text">
                        </label>
                        <label>
                            <my-text class="label" tag="p">¿Dónde lo viste?</my-text>
                            <textarea class ="text" name="location"></textarea>
                        </label>
                        <button class="button">Enviar</button> 
                    </form>
                `;
		style.innerHTML = `
                    .form-info{
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
                    input::placeholder{
                        color: #ede7f6;
                    }
                    .input:active{
                        background-color: #ede7f6;
                    }
                    .input:hover{
                        background-color: #ede7f6;
                    }
                    .text{
                        box-sizing: border-box;
                        font-size: 26px;
                        border: 3px solid rgb(128, 38, 212);
                        border-radius: 8px;
                        width: 100%;
                        height: 100px;
                        padding: 5px 2px;
                        font-family: 'Odibee Sans', cursive;
                        font-weight: 400;
                        text-align: center;
                        color: #f0fff;
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
                        .text{
                            font-size: 30px;
                            border-width: 4px;
                            padding: 7px 3px;
                            height: 130px;
                        }
                        .form-info{
                            width: 350px;
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
customElements.define("form-info", FormInfo);
