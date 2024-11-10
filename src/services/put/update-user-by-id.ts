import { eq } from "drizzle-orm"
import { db } from "../../db"
import { user } from "../../db/schema"
import { hash } from "bcrypt"

export const updateUserById = async ({ username, password }: IUserPost, employeeId: string) => {
	const newPassword = await hash(password, 5);
	
	await db
		.update(user)
		.set({
			username,
			password: newPassword,
		})
		.where(eq(user.employeeId, employeeId))
}
