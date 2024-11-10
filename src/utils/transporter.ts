import nodemailer from "nodemailer"
import { env } from "../env"

const transporter = nodemailer.createTransport({
	host: "smtp.gmail.com",
	port: 465,
	secure: true,
	auth: {
		user: env.SERVICE_EMAIL,
		pass: env.SERVICE_PASSWORD,
	},
})

export default transporter
