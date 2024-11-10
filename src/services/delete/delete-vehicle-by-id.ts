import { eq } from "drizzle-orm"
import { db } from "../../db"
import { vehicle } from "../../db/schema"

export const deleteVehicleById = async (vehicleId: string) => {
	await db.delete(vehicle).where(eq(vehicle.id, vehicleId))
}
