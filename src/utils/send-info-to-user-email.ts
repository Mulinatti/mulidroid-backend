import nodemailer from "nodemailer"
import { env } from "../env"

export const sendInfoToUserEmail = async (emailTo: string, username: string, userPassword: string) => {
	const transporter = nodemailer.createTransport({
		host: "smtp.gmail.com",
		port: 465,
		secure: true,
		auth: {
			user: env.SERVICE_EMAIL,
			pass: env.SERVICE_PASSWORD,
		},
	})

	await transporter.sendMail({
		from: '"Mulidroid" <mulidroid2@gmail.com>',
		to: emailTo,
		subject: "Informações de cadastro no aplicativo!",
		text: `
      Olá aqui estão suas informações de login! \n
      Usuário: ${username} \n
      Senha: ${userPassword}
    `,
	})

	console.log("Email enviado")
}
