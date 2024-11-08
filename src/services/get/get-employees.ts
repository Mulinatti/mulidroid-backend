import { count, eq } from "drizzle-orm";
import { db } from "../../db";
import { employee, employeeService, service } from "../../db/schema";

export const getEmployees = async () => {
  const servicesCount = db.$with("services_count").as(
    db
      .select({
        employeeId: employeeService.employeeId,
        servicesCount: count(service.id).as("servicesCount"),
      })
      .from(employeeService)
      .where(eq(employeeService.isPaid, false))
      .innerJoin(service, eq(service.id, employeeService.serviceId))
      .groupBy(employeeService.employeeId)
  );

  const employees = await db
    .with(servicesCount)
    .select({
      id: employee.id,
      alias: employee.alias,
      name: employee.name,
      driver: employee.driver,
      birthdate: employee.birthdate,
      phoneNumber: employee.phoneNumber,
			servicesCount: servicesCount.servicesCount
    })
    .from(employee)
    .leftJoin(servicesCount, eq(servicesCount.employeeId, employee.id));

  return employees;
};
