import { eq } from "drizzle-orm"
import { db } from "../../db"
import { user } from "../../db/schema"
import type { IUserPost } from "../../interfaces/IUser"

export const updateUserById = async ({ username, password }: IUserPost, employeeId: string) => {
	await db
		.update(user)
		.set({
			username,
			password,
		})
		.where(eq(user.employeeId, employeeId))
}
