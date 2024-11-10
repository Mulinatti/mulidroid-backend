import { and, eq } from "drizzle-orm"
import { db } from "../../db"
import { employeeService, service } from "../../db/schema"
import type { IServicePut } from "../../interfaces/IService"
import { employee as employeeTable } from "../../db/schema"

const removeFromEmployeeService = async (employeeId: string, serviceId: string) => {
	await db
		.delete(employeeService)
		.where(and(eq(employeeService.employeeId, employeeId), eq(employeeService.serviceId, serviceId)))
}

const addIntoEmployeeService = async (employeeId: string, serviceId: string) => {
	const employeeServiceExists = await db
		.select()
		.from(employeeService)
		.where(and(eq(employeeService.employeeId, employeeId), eq(employeeService.serviceId, serviceId)))

	if (!employeeServiceExists[0]) {
		await db.insert(employeeService).values({
			employeeId,
			serviceId,
		})
	}
}

export const updateServiceById = async (
	{ address, neighborhood, value, serviceDate, vehicle, employees }: IServicePut,
	serviceId: string
) => {
	await db
		.update(service)
		.set({
			address,
			neighborhood,
			value,
			serviceDate,
			vehicle,
		})
		.where(eq(service.id, serviceId))

	if (employees) {
		const AllEmployees = await db.select().from(employeeTable)

		const employeesToUpdate = new Set(employees)

		const employeesToRemove = AllEmployees.filter(employee => !employeesToUpdate.has(employee.id)).map(
			employee => employee.id
		)

		for (const employee of employeesToUpdate) {
			addIntoEmployeeService(employee, serviceId)
		}

		for (const employee of employeesToRemove) {
			removeFromEmployeeService(employee, serviceId)
		}
	}
}
