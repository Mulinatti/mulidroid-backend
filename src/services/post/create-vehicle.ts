import { db } from "../../db"
import { vehicle } from "../../db/schema"
import type { IVehiclePost } from "../../interfaces/IVehicle"

export const createVehicle = async ({ plate, model }: IVehiclePost) => {
	await db.insert(vehicle).values({
		plate,
		model,
	})
}
