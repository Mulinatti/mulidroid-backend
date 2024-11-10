import { count, eq } from "drizzle-orm"
import { db } from "../../db"
import { employee, employeeService, service as serviceTable, vehicle } from "../../db/schema"

export const getServiceById = async (serviceId: string) => {
	const serviceWithEmployees = db.$with("service_with_employees").as(
		db
			.select({
				serviceId: employeeService.serviceId,
			})
			.from(employeeService)
			.where(eq(employeeService.serviceId, serviceId))
	)

	const serviceFound = await db
		.with(serviceWithEmployees)
		.select({
			id: serviceTable.id,
			address: serviceTable.address,
			neighborhood: serviceTable.neighborhood,
			value: serviceTable.value,
			serviceDate: serviceTable.serviceDate,
			vehicle: {
				plate: vehicle.plate,
				model: vehicle.model,
			},
		})
		.from(serviceTable)
		.where(eq(serviceTable.id, serviceId))
		.leftJoin(serviceWithEmployees, eq(serviceTable.id, serviceWithEmployees.serviceId))
		.leftJoin(vehicle, eq(vehicle.id, serviceTable.vehicle))
		.limit(1)

	const employeeServiceCount = await db
		.select({
			employeeId: employeeService.employeeId,
			servicesCount: count(employeeService.serviceId).as("servicesCount"),
		})
		.from(employeeService)
		.where(eq(employeeService.isPaid, false))
		.groupBy(employeeService.employeeId)

	const employees = await db
		.select({
			id: employee.id,
			alias: employee.alias,
			name: employee.name,
			driver: employee.driver,
			birthdate: employee.birthdate,
			phoneNumber: employee.phoneNumber,
		})
		.from(employeeService)
		.innerJoin(employee, eq(employeeService.employeeId, employee.id))
		.where(eq(employeeService.serviceId, serviceId))

	const employeesWithServiceCount = employees.map((emp) => {
		const serviceCount = employeeServiceCount.find(
			(count) => count.employeeId === emp.id
		)?.servicesCount || 0

		return {
			...emp,
			servicesCount: serviceCount,
		}
	})

	const service = {
		...serviceFound[0],
		employees: employeesWithServiceCount,
	}

	return service
}
