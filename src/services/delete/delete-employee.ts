import { eq } from "drizzle-orm"
import { db } from "../../db"
import { employee } from "../../db/schema"

export const deleteEmployee = async (employeeId: string) => {
  await db.delete(employee).where(eq(employee.id, employeeId));
}