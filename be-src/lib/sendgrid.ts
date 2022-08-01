import * as sgMail from "@sendgrid/mail";
import "dotenv/config";

sgMail.setApiKey(process.env.SENDGRID_CREDS_APIKEY);
export { sgMail };
