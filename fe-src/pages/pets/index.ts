const editURL = require("url:../../../fe-src/images/pencil.png");
import { state } from "../../state";
import { Router } from "@vaadin/router";
class MyPetsPage extends HTMLElement {
	constructor() {
		super();
	}
	shadow = this.attachShadow({ mode: "open" });
	myPets = [];
	connectedCallback() {
		this.render();
	}
	addListeners() {
		const currentState = state.getState();
		state.getAllMyPets(() => {
			const cardContainer = this.shadow.querySelector(".cards-container");
			const text: HTMLElement = this.shadow.querySelector(".text");
			this.myPets = currentState.myPets;
			if (this.myPets.length > 0) {
				text.style.display = "none";
			}
			for (const p of this.myPets) {
				const card = document.createElement("div");
				card.classList.add("card");
				card.innerHTML = `
				<div class="card__img" style="background-image: url(${p.imgURL})">
					<p class="card__img-text">${p.state}</p>
				</div>
                <div class="card__content">
                    <div class="pet__content">
                        <my-text tag="h1" class="pet__name">${p.name}</my-text>
                        <my-text tag="p" class="pet__description">${p.description}</my-text>
                    </div>
                    <div class="info__content">
                        <my-text tag="h4" class="info__location">${p.location}</my-text>
                        <img src="${editURL}" alt="${p.id}" class="edit__img" />
                    </div>
                </div>
                `;
				cardContainer.appendChild(card);
				const editImg: HTMLImageElement = card.querySelector(".edit__img");
				let imgText: HTMLElement = card.querySelector(".card__img-text");
				if (p.state == "LOST") {
					imgText.style.color = "rgba(255, 0, 0, 0.425)";
				}
				if (p.state == "FINDED") {
					imgText.style.color = "rgba(7, 199, 23, 0.479)";
				}
				if (p.state == "UNPUBLISH") {
					imgText.style.color = "rgba(0, 0, 255, 0.425)";
				}
				editImg.addEventListener("click", () => {
					currentState.petId = editImg.alt;
					state.setState(currentState);
					Router.go("/edit");
				});
			}
		});
	}
	render() {
		const div = document.createElement("div");
		const style = document.createElement("style");
		div.innerHTML = `
                    <my-text class="title" tag="h1">Mis mascotas reportadas</my-text>
                    <my-text class="text" tag="p">No tienes mascotas reportadas</my-text>
                    <div class="cards-container"></div>
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
					max-width: 500px;
					height: 200px;
					display: flex;
					align-items: center;
				}
				.text-container{
					display: flex;
					flex-direction: column;
					align-items: center;
				}
				.text{
					max-width: 650px;
					height: 150px;
					display: flex;
					align-items: center;
					color: rgb(128, 38, 212);
				}
				.cards-container{
					display: grid;
					gap: 30px;
					align-items: center;
					justify-items: center;
				}
				.card{
					width: 350px;
					height: 480px;
					display: grid;
					align-items: center;
					justify-items: center;
					border: 3px solid rgb(128, 38, 212);
				}
				.card__img{
					width: 250px;
                    height: 250px;
					display: flex;
					align-items: center;
					justify-content: center;
					background-color: lightgrey;
					background-size: cover;
					background-position: 50% 50%;
					position: relative;
				}
				.card__img-text{
					font-size: 30px;
					font-weight: 700;
					position: absolute;
				}
				.card__content{
					width: 250px;
					display: grid;
					gap: 16px;
					align-items: center;
					justify-items: center;
				}
				.pet__content{
					display: grid;
					align-items: center;
					justify-items: center;
				}
                .info__content{
					width: 100%;
                    display: flex;
					align-items: center;
                    justify-content: center;
                }
				.edit__img{
					object-fit: cover;
					margin-left: 10px;
					width: 30px;
					height: 30px;
					cursor: pointer;
				}
                `;
		this.shadow.appendChild(div);
		this.shadow.appendChild(style);
		this.addListeners();
	}
}
customElements.define("pets-page", MyPetsPage);
