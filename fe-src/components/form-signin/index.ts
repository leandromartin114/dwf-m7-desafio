class FormSignin extends HTMLElement {
	constructor() {
		super();
		if (this.tags.includes(this.getAttribute("tag"))) {
			this.tag = this.getAttribute("tag") || this.tag;
		}
	}
	shadow = this.attachShadow({ mode: "open" });
	tags = ["mail", "pass"];
	tag: string = "mail";
	connectedCallback() {
		this.render();
	}
	addListeners() {
		const formIn = this.shadow.querySelector(".form-signin") as HTMLFormElement;
		formIn.addEventListener("submit", (e: any) => {
			e.preventDefault();
			const data = e.target;
			const myEvent = new CustomEvent("send", {
				detail: {
					text: data.text.value,
				},
			});
			this.dispatchEvent(myEvent);
			formIn.reset();
		});
	}
	render() {
		const div = document.createElement("div");
		const style = document.createElement("style");
		if (this.tag == "mail") {
			div.innerHTML = `
                        <form class="form-signin">
                            <label>
                                <my-text class="label" tag="p">EMAIL</my-text>
                                <input class ="input" name="text" type="text">
                            </label>
                            <button class="button">Siguiente</button>
                        </form>
                    `;
		}
		if (this.tag == "pass") {
			div.innerHTML = `
                        <form class="form-signin">
                            <label>
                                <my-text class="label" tag="p">PASSWORD</my-text>
                                <input class ="input" name="text" type="password">
                            </label>
                            <button class="button">Ingresar</button> 
                        </form>
                    `;
		}
		style.innerHTML = `
                    .form-signin{
                        width: 300px;
                        display: grid;
                        gap: 20px;
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
                        .form-signin{
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
customElements.define("form-signin", FormSignin);
