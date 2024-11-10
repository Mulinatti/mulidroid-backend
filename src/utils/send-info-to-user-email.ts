import transporter from "./transporter"

export const sendInfoToUserEmail = async (emailTo: string, username: string, userPassword: string) => {
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

	console.log("Email credenciais enviado")
}
