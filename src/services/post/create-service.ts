import { eq } from "drizzle-orm"
import { db } from "../../db"
import { employee, employeeService, service, user } from "../../db/schema"
import type { IServicePost } from "../../interfaces/IService"
import { sendServiceToUserEmail } from "../../utils/send-service-to-user-email"

export const createService = async ({
	address,
	neighborhood,
	value,
	serviceDate,
	vehicle,
	employees,
}: IServicePost) => {
	const createdService = await db
		.insert(service)
		.values({
			address,
			neighborhood,
			value,
			serviceDate,
			vehicle,
		})
		.returning()

	for (const employeeId of employees) {
		await db.insert(employeeService).values({
			serviceId: createdService[0].id,
			employeeId: employeeId,
		})

		const employeeToSendEmail = await db
			.select({
				email: user.email,
				name: employee.name,
			})
			.from(user)
			.leftJoin(employee, eq(employee.id, employeeId))
			.where(eq(user.employeeId, employeeId))

		const mailInfo = {
			emailTo: employeeToSendEmail[0].email,
			name: employeeToSendEmail[0].name,
			address,
			neighborhood,
			serviceDate,
		}

		await sendServiceToUserEmail(mailInfo)
	}
}
