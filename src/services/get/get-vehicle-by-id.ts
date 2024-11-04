import { eq } from "drizzle-orm"
import { db } from "../../db"
import { vehicle } from "../../db/schema"

export const getVehicleById = async (vehicleId: string) => {
	const foundVehicle = await db.select().from(vehicle).where(eq(vehicle.id, vehicleId)).limit(1)

	return foundVehicle[0]
}
