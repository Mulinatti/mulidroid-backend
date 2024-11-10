import { and, count, eq } from "drizzle-orm"
import { db } from "../../db"
import { employee, employeeService, service } from "../../db/schema"

export const getServicesByEmployeeId = async (employeeId: string) => {
	const employeesCount = db.$with("employees_count").as(
		db
			.select({
				serviceId: employeeService.serviceId,
				employeesCount: count(employee.id).as("employeesCount"),
			})
			.from(employeeService)
			.innerJoin(employee, eq(employee.id, employeeService.employeeId))
			.groupBy(employeeService.serviceId)
	)

	const services = await db
		.with(employeesCount)
		.select({
			id: service.id,
			address: service.address,
			neighborhood: service.neighborhood,
			serviceDate: service.serviceDate,
			value: service.value,
			employeesCount: employeesCount.employeesCount,
		})
		.from(service)
		.innerJoin(
			employeeService,
			and(eq(service.id, employeeService.serviceId), eq(employeeService.employeeId, employeeId))
		)
		.where(eq(employeeService.isPaid, false))
		.leftJoin(employeesCount, eq(service.id, employeesCount.serviceId))
		.orderBy(service.serviceDate)

	return services
}
