import { and, eq } from "drizzle-orm";
import { db } from "../../db";
import { employee, employeeService, service, vehicle } from "../../db/schema";

export const getEmployeeById = async (employeeId: string) => {
  const employeeFound = await db
    .select()
    .from(employee)
    .where(eq(employee.id, employeeId));

  const services = await db
    .select({
      id: service.id,
      address: service.address,
      neighborhood: service.neighborhood,
      value: service.value,
      serviceDate: service.serviceDate,
      vehicle: service.vehicle,
    })
    .from(service)
    .leftJoin(employeeService, eq(employeeService.serviceId, service.id))
    .leftJoin(vehicle, eq(vehicle.id, service.vehicle))
    .where(
      and(
        eq(employeeService.employeeId, employeeId),
        eq(employeeService.isPaid, false)
      )
    );

  return {
    ...employeeFound[0],
    services,
		servicesCount: services.length
  };
};
