import { db } from "../../db"
import { employee, user } from "../../db/schema"
import { sendInfoToUserEmail } from "../../utils/send-info-to-user-email"
import type { IEmployeePost } from "../../interfaces/IEmployee"
import { hash } from "bcrypt"

export const createEmployee = async ({
	name,
	alias,
	birthdate,
	driver,
	username,
	email,
	phoneNumber,
}: IEmployeePost) => {
	const randomPassword = Math.floor(Math.random() * (9999 - 1000) + 1000).toString()

	const hashPassword = await hash(randomPassword, 5)

	const createdEmployee = await db
		.insert(employee)
		.values({
			name,
			alias,
			birthdate,
			driver,
			phoneNumber,
		})
		.returning()

	await db
		.insert(user)
		.values({
			username,
			email,
			password: hashPassword,
			employeeId: createdEmployee[0].id,
		})
		.then(() => {
			sendInfoToUserEmail(email, username, randomPassword).catch(console.error)
		})
}
