import { and, count, eq } from "drizzle-orm";
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
      vehicle: {
        plate: vehicle.plate,
        model: vehicle.model,
      },
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

  const employeeCounts = await db
    .select({
      serviceId: employeeService.serviceId,
      employeesCount: count(employeeService.employeeId).as("employeesCount"),
    })
    .from(employeeService)
    .groupBy(employeeService.serviceId);

  const servicesWithEmployeeCount = services.map((service) => {
    const count = employeeCounts.find(
      (employeeCount) => employeeCount.serviceId === service.id
    )?.employeesCount || 0;

    return {
      ...service,
      employeesCount: count,
    };
  });

  return {
    ...employeeFound[0],
    services: servicesWithEmployeeCount,
    servicesCount: services.length,
  };
};
