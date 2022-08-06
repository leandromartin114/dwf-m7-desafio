import "dotenv/config";
import { state } from "../../state";
import Dropzone from "dropzone";
import "mapbox-gl/dist/mapbox-gl.css";
import * as mapboxgl from "mapbox-gl";
import Swal from "sweetalert2";
import { Router } from "@vaadin/router";
const MapboxClient = require("mapbox");
const mapboxClient = new MapboxClient(process.env.MAPBOX_TOKEN);

class EditPage extends HTMLElement {
	constructor() {
		super();
	}
	shadow = this.attachShadow({ mode: "open" });
	lat: number;
	lng: number;
	connectedCallback() {
		this.render();
	}
	initMap() {
		const mapEl = this.shadow.querySelector(".map");
		mapboxgl.accessToken = process.env.MAPBOX_TOKEN;
		return new mapboxgl.Map({
			container: mapEl,
			style: "mapbox://styles/mapbox/streets-v11",
			center: [-68.843616, -32.889828],
			zoom: 12,
			attributionControl: false,
		});
	}
	initSearchForm(callback) {
		const currentState = state.getState();
		const searchButton = this.shadow.querySelector(".search-btn") as any;
		const inputSearch = this.shadow.querySelector(".search") as any;
		const formReport = this.shadow.querySelector(
			".form-report"
		) as HTMLFormElement;
		const previewContainer = this.shadow.querySelector(".dropzone-previews");
		const picButton = this.shadow.querySelector(".green");
		const picPet: HTMLElement = this.shadow.querySelector(".pic-pet");
		const drop = document.createElement("div");
		drop.innerHTML = `
                    <div class="template-preview">
                        <div class="dz-preview dz-file-preview">
                            <div class="dz-details">
                                <img data-dz-thumbnail />
                            </div>
							<div class="dz-progress"><span class="dz-upload" data-dz-uploadprogress></span></div>
							<div class="dz-error-message"><span data-dz-errormessage></span></div>
                        </div>
                    </div>
        `;
		const myDropzone = new Dropzone(picButton, {
			url: "/falsa",
			autoProcessQueue: false,
			previewsContainer: previewContainer,
			thumbnailWidth: 200,
			thumbnailHeight: 200,
			previewTemplate: drop.querySelector(".template-preview").innerHTML,
			uploadMultiple: false,
		});
		let imgURL;
		myDropzone.on("thumbnail", function (file) {
			imgURL = file.dataURL;
			picPet.style.display = "none";
		});
		myDropzone.on("maxfilesexceeded", function (file) {
			myDropzone.removeAllFiles();
			myDropzone.addFile(file);
		});
		searchButton.addEventListener("click", (e: any) => {
			e.preventDefault();
			mapboxClient.geocodeForward(
				inputSearch.value,
				{
					country: "ar",
					autocomplete: true,
					language: "es",
				},
				(err, data, res) => {
					console.log(data);
					if (!err) callback(data.features);
				}
			);
		});
		formReport.addEventListener("submit", (e: any) => {
			e.preventDefault();
			const data = e.target;
			currentState.petData = {
				name: data.name.value,
				description: data.description.value,
				imgURL: imgURL,
				lat: this.lat,
				lng: this.lng,
				userId: currentState.userId,
				location: data.q.value,
				email: currentState.email,
			};
			state.setState(currentState);
			state.updatePetData(() => {
				Swal.fire({
					title: "Datos guardados con éxito",
					text: "¡Esperamos que puedas encontrar a tu mascota pronto!",
					icon: "success",
					confirmButtonColor: "rgb(128, 38, 212)",
				});
				Router.go("/pets");
			});
		});
	}
	addListeners() {
		const currentState = state.getState();
		const formReport = this.shadow.querySelector(
			".form-report"
		) as HTMLFormElement;
		const picPet: HTMLImageElement = this.shadow.querySelector(".pic-pet");
		const formReportName: any = formReport.name;
		const formReportDescription: any = formReport.description;
		const formReportLocation: any = formReport.q;
		currentState.myPets.find((p) => {
			if (p.id == currentState.petId) {
				currentState.petData = p;
				state.setState(currentState);
				formReportName.value = p.name;
				formReportDescription.value = p.description;
				formReportLocation.value = p.location;
				picPet.src = p.imgURL;
			}
		});
		const map = this.initMap();
		this.initSearchForm((results) => {
			const firstResult = results[0];
			const marker = new mapboxgl.Marker()
				.setLngLat(firstResult.geometry.coordinates)
				.addTo(map);
			const [lng, lat] = firstResult.geometry.coordinates;
			this.lat = lat;
			this.lng = lng;
			map.setCenter(firstResult.geometry.coordinates);
			map.setZoom(12);
		});
		const findedBtn = this.shadow.querySelector(".find");
		const unpublishBtn = this.shadow.querySelector(".red");
		const petName = currentState.petData.name;
		findedBtn.addEventListener("click", () => {
			currentState.petData.state = "FINDED";
			state.setState(currentState);
			state.updatePetData(() => {
				Swal.fire({
					title: "¡Que alegría que encontraste a " + petName + "!",
					text: "Nos alegra haber ayudado a encontrarlo",
					icon: "success",
					confirmButtonColor: "rgb(128, 38, 212)",
				});
				Router.go("/pets");
			});
		});
		unpublishBtn.addEventListener("click", () => {
			currentState.petData.state = "UNPUBLISH";
			state.setState(currentState);
			state.updatePetData(() => {
				Swal.fire({
					title: "Mascota despublicada",
					text: "Esperamos haberte ayudado",
					icon: "success",
					confirmButtonColor: "rgb(128, 38, 212)",
				});
				Router.go("/pets");
			});
		});
	}
	render() {
		const div = document.createElement("div");
		const style = document.createElement("style");
		div.innerHTML = `
                    <my-text class="title" tag="h1">Editar mascota perdida</my-text>
                    <form class="form-report">
                        <label>
                            <my-text class="label" tag="p">Nombre</my-text>
                            <input class ="input" name="name" type="text">
                        </label>
                        <label>
                            <my-text class="label" tag="p">Breve descripción</my-text>
                            <input class ="input" name="description" type="text">
                        </label>
                        <div class="pic-container">
                            <div class="dropzone-previews">
								<img src="" class="pic-pet"/>
							</div>
							<button type="button" class="btn green">Agregar foto</button> 
                        </div>
                        <div class="map" style="width: 100%; height: 350px"></div>
                        <label>
                            <my-text class="label" tag="p">Ubicación</my-text>
                            <input class ="input search" name="q" type="search">
                            <button type="button" class="search-btn btn normal">Buscar</button>
                        </label>
                        <my-text class="text" tag="p">BUSCÁ UN PUNTO DE REFERENCIA PARA REPORTAR A TU MASCOTA. PUEDE SER UNA DIRECCIÓN, UN BARRIO O UNA CIUDAD</my-text>
                        <button type="submit" class="btn submit">Guardar</button> 
                        <button type="button" class="btn normal find">Reportar como encontrado</button> 
                        <button type="button" class="btn red">Despublicar</button> 
                    </form>
                `;
		div.classList.add("content");
		style.innerHTML = `
                .content{
					box-sizing: border-box;
                    padding: 0 20px 20px 20px;
                    width: 100%;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    align-items: center;
                }
                .title{
                    max-width: 400px;
                    height: 200px;
                    display: flex;
                    align-items: center;
                }
                .form-report{
					width: 300px;
                    display: grid;
                    gap: 15px;
                    justify-content: center;
                    align-items: center;
                }
                .label{
                    display: flex;
					width: 100%;
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
                .pic-container{
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                }
                .dropzone-previews{
					display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    margin-bottom: 20px;
                    width: 280px;
                    height: 280px;
                    background-color: rgb(221, 218, 218);
                }
				.pic-pet{
					width: 200px;
                    height: 200px;
                    background-color: rgb(221, 218, 218);
					object-fit: cover;
				}
				.search{
					margin-bottom: 15px;
				}
                .btn{
                    font-size: 20px;
					border-radius: 8px;
					width: 100%;
					padding: 5px 2px;
					color: black;
					font-family: 'Odibee Sans', cursive;
					font-weight: 400;
                }
				.green{
					background-color: rgb(152, 238, 131);
					border: 3px solid rgb(64, 136, 46);
				}
				.grey{
					background-color: rgb(184, 177, 185);
					border: 3px solid rgb(81, 77, 82);
				}
                .red{
					background-color: rgb(240, 116, 116);
					border: 3px solid rgb(153, 42, 42);
				}
				.normal{
					background-color: rgb(179, 140, 216);
					border: 3px solid rgb(128, 38, 212);
				}
				.submit{
					background-color: rgb(179, 140, 216);
					border: 3px solid rgb(128, 38, 212);
				}
                @media (min-width: 969px){
                    .input{
                        font-size: 26px;
                        border-width: 4px;
                        padding: 7px 3px;
                    }
                    .form-report{
                        width: 430px;
                    }
                    .btn{
                        font-size: 26px;
						border-width: 4px;
						padding: 7px 3px;
                    }
					.dropzone-previews{
						width: 320px;
						height: 320px;
                }
                `;
		this.shadow.appendChild(div);
		this.shadow.appendChild(style);
		this.addListeners();
	}
}
customElements.define("edit-page", EditPage);
