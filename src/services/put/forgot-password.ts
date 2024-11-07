import { and, eq } from "drizzle-orm";
import { db } from "../../db";
import { user } from "../../db/schema";
import { hash } from "bcrypt";

interface ForgotPasswordRequest {
  username: string;
  password: string;
  email: string;
}

export const forgotPassword = async ({
  username,
  password,
  email,
}: ForgotPasswordRequest) => {
  const userExists = await db
    .select()
    .from(user)
    .where(and(eq(user.username, username), eq(user.email, email)));

  if (!userExists[0]) {
    throw new Error(
      "Não foi possível encontrar um usuário com essas informações"
    );
  }

  const newPassword = await hash(password, 5);

  await db
    .update(user)
    .set({
      password: newPassword,
    })
    .where(and(eq(user.username, username), eq(user.email, email)));

    return "Senha atualizada"
};
