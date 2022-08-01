class myButton extends HTMLElement {
	constructor() {
		super();
	}
	shadow = this.attachShadow({ mode: "open" });
	text = this.textContent;
	types = ["normal", "green", "grey", "red"];
	type: string = "normal";
	connectedCallback() {
		if (this.types.includes(this.getAttribute("type"))) {
			this.type = this.getAttribute("type") || this.type;
		}
		this.render();
	}
	render() {
		const div = document.createElement("div");
		const style = document.createElement("style");
		div.innerHTML = `
				<button class="${this.type} all">${this.text}</button>
			`;
		style.innerHTML = `
				.root{
					width: 300px;
				}
				.all{
					font-size: 26px;
					border-radius: 8px;
					width: 100%;
					padding: 5px 2px;
					color: black;
					font-family: 'Odibee Sans', cursive;
					font-weight: 400;
					cursor: pointer;
				}
				.normal{
					background-color: rgb(179, 140, 216);
					border: 3px solid rgb(128, 38, 212);
				}
				.green{
					background-color: rgb(152, 238, 131);
					border: 3px solid rgb(64, 136, 46);
				}
				.red{
					background-color: rgb(240, 116, 116);
					border: 3px solid rgb(153, 42, 42);
				}
				.grey{
					background-color: rgb(184, 177, 185);
					border: 3px solid rgb(81, 77, 82);
				}
				.all:active{
					color: rgba(208, 212, 214, 0.918);
				}
				.all:hover{
					color: rgba(208, 212, 214, 0.918);
				}
				@media (min-width: 969px){
					.root{
						width: 360px;
					}
					.all{
						font-size: 30px;
						border-width: 4px;
						padding: 7px 3px;
					}
				}
			`;
		div.classList.add("root");
		this.shadow.appendChild(div);
		this.shadow.appendChild(style);
	}
}
customElements.define("my-button", myButton);
