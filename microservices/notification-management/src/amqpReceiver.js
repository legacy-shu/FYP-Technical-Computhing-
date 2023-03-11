import amqp from "amqplib";
import sendEmail from "./email.js";
import { config } from "./config.js";
import fs from "fs";
import jsdom from "jsdom";
const { JSDOM } = jsdom;

let connection, channel;
export default async function amqpReceiver() {
  try {
    connection = await amqp.connect(config.rabbitmq.url);
    channel = await connection.createChannel();
    await channel.assertQueue("applyjob");
    channel.consume("applyjob", (data) => {
      const message = JSON.parse(data.content);
      const sendMessageToJobSeeker = createJobSeekerMessage(message);
      const sendMessageToJobProvider = createJobProviderMessage(message);
      sendEmail(sendMessageToJobProvider);
      sendEmail(sendMessageToJobSeeker);
      channel.ack(data);
    });
  } catch (ex) {
    console.log(ex);
  }
}
function createJobSeekerMessage(data) {
  let html = fs.readFileSync("src/template.html", "utf-8");
  let dom = new JSDOM(html);
  dom.window.document.getElementById("head-title").innerHTML =
    "Your CV has been delivered: You're one step closer to your next career move.";
  dom.window.document.getElementById("cv-link").innerHTML = "";

  return {
    from: "JobFinder-Notification@jobfinder.com",
    to: `c2c5bab22e-adff9d+${data.applicantEmail}@inbox.mailtrap.io`,
    subject: `You're Moving Forware: Your CV is Submitted`,
    html: dom.serialize(),
  };
}
function createJobProviderMessage(data) {
  let html = fs.readFileSync("src/template.html", "utf-8");
  let dom = new JSDOM(html);
  let cvlink = dom.window.document.getElementById("cv-link");
  cvlink.href = data.cv;
  return {
    from: "JobFinder-Notification@jobfinder.com",
    to: `c2c5bab22e-adff9d+${data.companyEmail}@inbox.mailtrap.io`,
    subject: `A Perfect Fit for Your Open Position Has Been Found`,
    html: dom.serialize(),
  };
}
