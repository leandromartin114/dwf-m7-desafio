const cancelURL = require("url:../../../fe-src/images/cancel.png");
const menuURL = require("url:../../../fe-src/images/menu.png");
const logoURL = require("url:../../../fe-src/images/logo.png");
import { Router } from "@vaadin/router";
import { state } from "../../state";

class MyHeader extends HTMLElement {
	constructor() {
		super();
	}
	shadow = this.attachShadow({ mode: "open" });
	connectedCallback() {
		state.subscribe(() => {
			this.shadow.firstChild?.remove();
			this.render();
		});
	}
	addListeners() {
		const currentState = state.getState();
		const logoEl = this.shadow.querySelector(".header__logo");
		const openMenuEl = this.shadow.querySelector(".header__open");
		const menuEl: HTMLElement = this.shadow.querySelector(".menu");
		const closeMenuEl = this.shadow.querySelector(".menu__close");
		const datosEl = this.shadow.querySelector(".datos");
		const mascotasEl = this.shadow.querySelector(".mascotas");
		const reportarEl = this.shadow.querySelector(".reportar");
		const datosB = this.shadow.querySelector(".datos-b");
		const mascotasB = this.shadow.querySelector(".mascotas-b");
		const reportarB = this.shadow.querySelector(".reportar-b");
		logoEl.addEventListener("click", () => {
			Router.go("/home");
		});
		openMenuEl.addEventListener("click", () => {
			menuEl.style.display = "flex";
		});
		closeMenuEl.addEventListener("click", () => {
			menuEl.style.display = "";
		});
		datosEl.addEventListener("click", () => {
			currentState.link = "/mydata";
			state.setState(currentState);
			if (
				currentState.token &&
				currentState.token.includes("email or pass incorrect") == false
			) {
				Router.go("/mydata");
				menuEl.style.display = "";
			} else {
				Router.go("/signin");
				menuEl.style.display = "";
			}
		});
		mascotasEl.addEventListener("click", () => {
			currentState.link = "/pets";
			state.setState(currentState);
			if (
				currentState.token &&
				currentState.token.includes("email or pass incorrect") == false
			) {
				Router.go("/pets");
				menuEl.style.display = "";
			} else {
				Router.go("/signin");
				menuEl.style.display = "";
			}
		});
		reportarEl.addEventListener("click", () => {
			currentState.link = "/report";
			state.setState(currentState);
			if (
				currentState.token &&
				currentState.token.includes("email or pass incorrect") == false
			) {
				Router.go("/report");
				menuEl.style.display = "";
			} else {
				Router.go("/signin");
				menuEl.style.display = "";
			}
		});
		datosB.addEventListener("click", () => {
			currentState.link = "/mydata";
			state.setState(currentState);
			if (
				currentState.token &&
				currentState.token.includes("email or pass incorrect") == false
			) {
				Router.go("/mydata");
				menuEl.style.display = "";
			} else {
				Router.go("/signin");
				menuEl.style.display = "";
			}
		});
		mascotasB.addEventListener("click", () => {
			currentState.link = "/pets";
			state.setState(currentState);
			if (
				currentState.token &&
				currentState.token.includes("email or pass incorrect") == false
			) {
				Router.go("/pets");
				menuEl.style.display = "";
			} else {
				Router.go("/signin");
				menuEl.style.display = "";
			}
		});
		reportarB.addEventListener("click", () => {
			currentState.link = "/report";
			state.setState(currentState);
			if (
				currentState.token &&
				currentState.token.includes("email or pass incorrect") == false
			) {
				Router.go("/report");
				menuEl.style.display = "";
			} else {
				Router.go("/signin");
				menuEl.style.display = "";
			}
		});
		const userEl = this.shadow.querySelector(".user-container");
		const userElB = this.shadow.querySelector(".user-container-b");
		if (
			currentState.token &&
			currentState.token.includes("email or pass incorrect") == false
		) {
			userEl.innerHTML = `
                        <my-text tag="h6">${currentState.email}</my-text>
                        <my-text tag="h5" class="close-session">cerrar sesión</my-text>
                    `;
			const closeSessionEl = userEl.querySelector(".close-session");
			closeSessionEl.addEventListener("click", () => {
				state.resetToken();
				Router.go("/home");
			});
			userElB.innerHTML = `
                        <my-text tag="h6">${currentState.email}</my-text>
                        <my-text tag="h5" class="close-session-b">cerrar sesión</my-text>
                    `;
			const closeSessionElB = userElB.querySelector(".close-session-b");
			closeSessionElB.addEventListener("click", () => {
				state.resetToken();
				Router.go("/home");
			});
		}
	}
	render() {
		const div = document.createElement("div");
		const style = document.createElement("style");
		div.classList.add("container");
		div.innerHTML = `
        <div class="menu">
            <img src="${cancelURL}" alt="cancel" class="menu__close" />
            <ul class="menu__ul">
                <li class="menu__li datos">Mis datos</li>
                <li class="menu__li mascotas">Mis mascotas reportadas</li>
                <li class="menu__li reportar">Reportar mascota</li>
            </ul>
            <div class="user-container menu__user"></div>
        </div>
        <header class="header">
            <img src="${logoURL}" alt="logo" class="header__logo" />
            <img src="${menuURL}" alt="menu" class="header__open" />
            <ul class="header__menu-desktop">
                <li class="header__menu-desktop-li datos-b">Mis datos</li>
                <li class="header__menu-desktop-li mascotas-b">Mis mascotas reportadas</li>
                <li class="header__menu-desktop-li reportar-b">Reportar mascota</li>
            </ul>
            <div class="user-container-b desktop__user"></div>
        </header>
        `;
		style.innerHTML = `
        .container{
            width: 100%;
            padding: 10px 30px;
            margin: 0;
            font-family: "Poppins", sans-serif;
            display: flex;
        }
        .header {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        .header__logo {
            height: 100px;
            width: 100px;
            cursor: pointer;
        }
        .header__open {
            height: 42px;
            width: 42px;
            padding: 10px 18px;
            cursor: pointer;
        }
        @media (min-width: 960px) {
            .header__open {
                display: none;
            }
            .header__logo {
                height: 140px;
                width: 140px;
            }
        }
        .menu {
            display: none;
            flex-direction: column;
            position: absolute;
            z-index: 10;
            height: 100vh;
            width: 100%;
            background-color: rgb(155, 74, 231);
            align-items: center;
            justify-content: center;
            margin: 0;
            padding: 0;
        }
        .menu__ul{
            margin: 0;
            padding: 0;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-around;
            width: 300px;
            height: 450px;
        }
        .menu__li {
            padding: 0;
            list-style: none;
            font-size: 26px;
            font-weight: 700;
            text-align: center;
            cursor: pointer;
        }
        .menu__li:hover{
            color: rgb(211, 187, 233);
        }
        .menu__user{
            display: flex;
            flex-direction: column;
        }
        .menu__close {
            height: 40px;
            width: 40px;
            position: absolute;
            z-index: 15;
            top: 20px;
            right: 20px;
            cursor: pointer;
        }
        .header__menu-desktop {
            display: none;
            width: 670px;
            margin: 0;
            padding: 15px;
        }
        @media (min-width: 960px) {
            .header__menu-desktop {
                display: flex;
                align-items: center;
                justify-content: space-around;
            }
        }
        .header__menu-desktop-li {
            list-style: none;
            font-weight: 400;
            font-size: 20px;
            text-align: center;
        }
        .header__menu-desktop-li:hover{
            font-weight: 700;
            cursor: pointer
        }
        .desktop__user{
            display: none;
        }
        @media (min-width: 960px) {
            .desktop__user{
                display: flex;
            }
        }
        .user-container{
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-around;
        }
        .user-container-b{
            display none;
            padding: 0 50px 0 0;
            flex-direction: column;
            align-items: center;
            justify-content: space-around;
        }
        @media (min-width: 960px) {
            .user-container-b{
                display: flex;
            }
        }
        `;
		this.shadow.firstChild?.remove();
		this.shadow.appendChild(div);
		this.shadow.appendChild(style);
		this.addListeners();
	}
}
customElements.define("my-header", MyHeader);
