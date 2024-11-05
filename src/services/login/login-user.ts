import { compare } from "bcrypt";
import type { IUserPost } from "../../interfaces/IUser";
import { db } from "../../db";
import { user } from "../../db/schema";
import { eq } from "drizzle-orm";

export const loginUser = async ({ username, password }: IUserPost) => {
  const userCredentials = await db
    .select()
    .from(user)
    .where(eq(user.username, username))
    .limit(1);

  if(!userCredentials[0] || !await compare(password, userCredentials[0].password))
    throw new Error("Credenciais incorretas")

  console.log("Usuário logou")
};
