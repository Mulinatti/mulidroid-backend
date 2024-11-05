import { eq } from "drizzle-orm";
import { db } from "../../db";
import { employee } from "../../db/schema";
import type { IEmployePut } from "../../interfaces/IEmployee";

export const updateEmployeeById = async (
  {
    name,
    alias,
    driver,
    phoneNumber,
  }: IEmployePut,
  employeeId: string
) => {
  await db
    .update(employee)
    .set({
      name,
      alias,
      driver,
      phoneNumber,
    })
    .where(eq(employee.id, employeeId));
};
