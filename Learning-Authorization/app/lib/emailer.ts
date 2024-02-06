import nodemailer from "nodemailer"
import { IEmailer } from "../interfaces/emailer"
import dotEnv from "dotenv"

dotEnv.config()

const emailer = async ({ to, subject, html }: IEmailer) => {
  if (!to) {
    throw new Error("Emailer need recipient email. 'to' parameter is missing")
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.email,
      pass: process.env.password,
    },
  })

  await transporter.sendMail({
    to,
    subject,
    html,
  })
}

export { emailer }
