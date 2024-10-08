import { count, eq, sql } from "drizzle-orm";
import { db } from "../../db";
import {
  employee,
  employeeService,
  service,
} from "../../db/schema";

export const getServices = async () => {
  const employeesCount = db.$with("employees_count").as(
    db
      .select({
        serviceId: employeeService.serviceId,
        employeesCount: count(employee.id).as("employeesCount"),
      })
      .from(employeeService)
      .innerJoin(
        employee,
        eq(employee.id, employeeService.employeeId)
      )
      .groupBy(employeeService.serviceId)
  );

  const result = await db
    .with(employeesCount)
    .select({
      serviceId: service.id,
      address: service.address,
      neighborhood: service.neighborhood,
      value: service.value,
      serviceDate: service.serviceDate,
      employeesCount: employeesCount.employeesCount,
    })
    .from(service)
    .leftJoin(employeesCount, eq(service.id, employeesCount.serviceId))
    .orderBy(service.serviceDate);

  return result;
};
