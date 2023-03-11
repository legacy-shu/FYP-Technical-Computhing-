import nodemailer from "nodemailer";
import { config } from "./config.js";
const transporter = nodemailer.createTransport({
  host: config.mail.host,
  port: config.mail.port,
  secure: false,
  auth: {
    user: config.mail.user,
    pass: config.mail.pass,
  },
});

export default async function sendEmail(data) {
  transporter.sendMail(data, (error, info) => {
    if (error) {
      console.log(error);
    }
    console.log(info);
  });
}
