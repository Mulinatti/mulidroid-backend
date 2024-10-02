import { eq } from "drizzle-orm";
import { db } from "../../db";
import { employee as employeeTable, employee, employeeService, service } from "../../db/schema";

export const getServices = async () => {
  const services = await db.select().from(service);

  const result = [];

  for(const service of services) {
    const employee = await db.select({
      id: employeeTable.id,
      alias: employeeTable.alias
    })
    .from(employeeTable)
    .innerJoin(employeeService, eq(employeeTable.id, employeeService.employeeId))
    .where(eq(employeeService.serviceId, service.id))

    const serviceWithEmployee = {
      service,
      employees: employee
    }

    result.push(serviceWithEmployee);
  }

  return result;
};
