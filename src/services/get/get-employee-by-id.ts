import { eq } from "drizzle-orm"
import { db } from "../../db"
import { employee, employeeService, service } from "../../db/schema"

export const getEmployeeById = async (employeeId: string) => {
	const employeeFound = await db.select().from(employee).where(eq(employee.id, employeeId))

	const services = await db
		.select({
			id: service.id,
			address: service.address,
			neighborhood: service.neighborhood,
		})
		.from(service)
		.leftJoin(employeeService, eq(employeeService.serviceId, service.id))
		.where(eq(employeeService.employeeId, employeeId))

	return {
		...employeeFound[0],
		services,
	}
}
