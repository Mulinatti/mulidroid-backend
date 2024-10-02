import { db } from "../../db";
import { employeeService, service } from "../../db/schema";

interface CreateServiceRequest {
  address: string;
  neighborhood: string;
  value: number;
  serviceDate: string;
  employees: string[];
}

export const createService = async ({
  address,
  neighborhood,
  value,
  serviceDate,
  employees,
}: CreateServiceRequest) => {
  const createdService = await db.insert(service).values({
    address,
    neighborhood,
    value,
    serviceDate
  }).returning();

  for(const employeeId of employees) {
    await db.insert(employeeService).values({
      serviceId: createdService[0].id,
      employeeId: employeeId
    })
  }
};
