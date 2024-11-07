import { compare } from "bcrypt";
import type { IUser, IUserRequest } from "../../interfaces/IUser";
import { db } from "../../db";
import { user as userTable} from "../../db/schema";
import { eq } from "drizzle-orm";

export const loginUser = async ({ username, password }: IUserRequest) => {
  const userCredentials = await db
    .select()
    .from(userTable)
    .where(eq(userTable.username, username))
    .limit(1);

    const user: IUser = userCredentials[0];

  if(!user || !await compare(password, user.password))
    throw new Error("Credenciais incorretas")

  return {
    id: user.id,
    username: user.username,
    employeeId: user.employeeId,
    admin: user.admin
  }
};
