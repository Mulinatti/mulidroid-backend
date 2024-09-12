import { db } from "../db";
import { employee } from "../db/schema";

export const getEmployees = async () => {
  const employees = await db
    .select({
      id: employee.id,
      name: employee.name,
      driver: employee.driver,
    })
    .from(employee);

  return { employees };
};
