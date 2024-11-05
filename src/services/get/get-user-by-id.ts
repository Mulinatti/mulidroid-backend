import { eq } from "drizzle-orm";
import { db } from "../../db";
import { user } from "../../db/schema";

export const getUserById = async (employeeId: string) => {
  const userFound = await db
    .select()
    .from(user)
    .where(eq(user.employeeId, employeeId))
    .limit(1);

  return userFound[0];
};
