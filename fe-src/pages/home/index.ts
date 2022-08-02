import { state } from "../../state";
import { Router } from "@vaadin/router";

class HomePage extends HTMLElement {
	constructor() {
		super();
	}
	shadow = this.attachShadow({ mode: "open" });
	pets = [];
	connectedCallback() {
		this.render();
	}
	addListeners() {
		const currentState = state.getState();
		const locationButton = this.shadow.querySelector(".location-btn");
		locationButton.addEventListener("click", () => {
			navigator.geolocation.getCurrentPosition((position) => {
				currentState.lat = position.coords.latitude;
				currentState.lng = position.coords.longitude;
				state.setState(currentState);
				state.getPetsNearBy(() => {
					this.pets = currentState.pets;
					const cardContainer = this.shadow.querySelector(".cards-container");
					const textContainer: HTMLElement =
						this.shadow.querySelector(".text-container");
					textContainer.style.display = "none";
					for (const p of this.pets) {
						const card = document.createElement("div");
						card.classList.add("card");
						card.innerHTML = `
						<div class="card__img" tag="${p.id}" style="background-image: url(${p.imgURL})">
							<p class="card__img-text">${p.state}</p>
						</div>
						<div class="card__content">
							<div class="pet__content">
								<my-text tag="h1" class="pet__name">${p.name}</my-text>
								<my-text tag="p" class="pet__description">${p.description}</my-text>
							</div>
							<div class="info__content">
								<my-text tag="h4" class="info__location">${p.location}</my-text>
								<my-text tag="h5" class="info__report">REPORTAR INFORMACIÓN</my-text>
							</div>
						</div>
						`;
						cardContainer.appendChild(card);
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
						const infoReport = card.querySelector(".info__report");
						const imgEl: any = card.querySelector(".card__img");
						infoReport.addEventListener("click", () => {
							currentState.petId = imgEl.tag;
							state.setState(currentState);
							Router.go("/info");
						});
					}
				});
			});
		});
	}
	render() {
		const div = document.createElement("div");
		const style = document.createElement("style");
		div.innerHTML = `
                    <my-text class="title" tag="h1">Mascotas perdidas cerca tuyo</my-text>
                    <div class="text-container">
                        <my-text class="text" tag="p">Para ver las mascotas reportadas cerca tuyo necesitamos permiso para conocer tu ubicación</my-text>
                        <my-button type="normal" class="location-btn">Mi ubicación</my-button>
                    </div>
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
					font-size: 34px;
					font-weight: 700;
					position: absolute;
					color: rgba(0, 0, 0, 0.349);
				}
                .card__content{
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
					display: grid;
					align-items: center;
					justify-items: center;
				}
                `;
		this.shadow.appendChild(div);
		this.shadow.appendChild(style);
		this.addListeners();
	}
}
customElements.define("home-page", HomePage);
