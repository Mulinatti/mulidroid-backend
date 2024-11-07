import { and, eq } from "drizzle-orm";
import { db } from "../../db";
import { employeeService } from "../../db/schema";

export const employeeServicePayment = async (
  serviceId: string,
  employeeId: string
) => {
  await db
    .update(employeeService)
    .set({
      isPaid: true,
    })
    .where(
      and(
        eq(employeeService.serviceId, serviceId),
        eq(employeeService.employeeId, employeeId)
      )
    );
};
