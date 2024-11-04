import { db } from "../../db"
import { vehicle } from "../../db/schema"

interface CreateVehicleRequest {
	plate: string
	model: string
}

export const createVehicle = async ({ plate, model }: CreateVehicleRequest) => {
	await db.insert(vehicle).values({
		plate,
		model,
	})
}
