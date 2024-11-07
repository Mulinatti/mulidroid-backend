import transporter from "./transporter"

interface ServiceEmailData {
	address: string
	neighborhood: string
	serviceDate: string
	name: string | null
	emailTo: string
}

export const sendServiceToUserEmail = async ({
	address,
	neighborhood,
	serviceDate,
	name,
	emailTo,
}: ServiceEmailData) => {
	await transporter.sendMail({
		from: '"Mulidroid" <mulidroid2@gmail.com>',
		to: emailTo,
		subject: "Temos um serviço para você!",
		text: `
      ${name}, no dia ${serviceDate}, ${address}, ${neighborhood}
    `,
	})

	console.log("Email serviço enviado")
}
