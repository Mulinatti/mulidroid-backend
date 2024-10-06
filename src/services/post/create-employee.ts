import { eq } from "drizzle-orm";
import { db } from "../../db";
import { employee, user } from "../../db/schema";

interface CreateEmployeeRequest {
  name: string;
  alias: string;
  birthdate: string;
  driver: boolean;
  username: string;
  phoneNumber: string;
}

export const createEmployee = async ({
  name,
  alias,
  birthdate,
  driver,
  username,
  phoneNumber,
}: CreateEmployeeRequest) => {
  
  const randomPassword = Math.floor(
    Math.random() * (9999 - 1000) + 1000
  ).toString();

  const createdEmployee = await db
    .insert(employee)
    .values({
      name,
      alias,
      birthdate,
      driver,
      phoneNumber,
    })
    .returning();

  await db.insert(user).values({
    username,
    password: randomPassword,
    employeeId: createdEmployee[0].id,
  });
};
