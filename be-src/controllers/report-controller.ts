// import { Report } from "../models/index";
// import { sgMail } from "../lib/sendgrid";
const Report = require("../models");
const sgMail = require("../lib/sendgrid");

export async function createReport(id: number, bodyData) {
	const newReport = await Report.create({
		fullName: bodyData.fullName,
		phoneNumber: bodyData.phoneNumber,
		placeDescription: bodyData.placeDescription,
		petId: id,
	});
	const destinatary = bodyData.email;
	const msg = {
		to: destinatary,
		from: "leandrom.roldan@gmail.com",
		subject: `Hemos visto a ${bodyData.petName}`,
		text: "¡Vimos a tu mascota!",
		html: `<p>${bodyData.fullName} vio a ${bodyData.petName} en: ${bodyData.placeDescription}. Teléfono: ${bodyData.phoneNumber}</p>`,
	};
	sgMail
		.send(msg)
		.then(() => {
			console.log("Email sent");
		})
		.catch((error) => {
			console.error(error);
		});
	return newReport;
}

// export async function sendMail() {
// 	const msg = {
// 		to: "leandromartin_17@hotmail.com",
// 		from: "leandrom.roldan@gmail.com",
// 		subject: "Sending with SendGrid is Fun",
// 		text: "and easy to do anywhere, even with Node.js",
// 		html: "<strong>and easy to do anywhere, even with Node.js</strong>",
// 	};
// 	sgMail
// 		.send(msg)
// 		.then(() => {
// 			console.log("Email sent");
// 		})
// 		.catch((error) => {
// 			console.error(error);
// 		});
// }
