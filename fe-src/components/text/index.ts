class MyText extends HTMLElement {
	constructor() {
		super();
		if (this.tags.includes(this.getAttribute("tag"))) {
			this.tag = this.getAttribute("tag") || this.tag;
		}
	}
	connectedCallback() {
		this.render();
	}
	text = this.textContent;
	tags: string[] = ["h1", "h5", "h4", "p", "h6"];
	tag: string = "p";
	shadow = this.attachShadow({ mode: "open" });
	render() {
		const textEl = document.createElement(this.tag);
		textEl.classList.add("my-text");
		textEl.textContent = this.text;
		const style = document.createElement("style");
		style.innerHTML = `
                h1{
					margin: 0;
                    font-size: 31px;
                    font-weight: 700;
                    text-align: center;
                }
				h5{
					margin: 0;
                    font-size: 14px;
                    text-align: right;
                    font-weight: 400;
                    color: blue;
                    text-decoration: underline;
					cursor: pointer;
				}
                p{
					margin: 0;
                    font-size: 16px;
                    font-weight: 400;
                    text-align: center;
                }
                h6{
					margin: 0;
                    font-size: 14px;
                    font-weight: 400;
                    text-align: center;
                }
                h4{
					margin: 0;
                    font-size: 18px;
                    font-weight: 700;
                    text-align: center;
                }
				@media (min-width: 969px){
					h1{
						font-size: 38px;
					}
					h5{
						font-size: 16px;
					}
					h6{
						font-size: 16px;
					}
					h4{
						font-size: 18px;
					}
					p{
						font-size: 18px;
					}
				}
            `;
		this.shadow.appendChild(textEl);
		this.shadow.appendChild(style);
	}
}
customElements.define("my-text", MyText);
