import { db } from "../../db"
import { employeeService, service } from "../../db/schema"
import type { IServicePost } from "../../interfaces/IService"

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
	}
}
