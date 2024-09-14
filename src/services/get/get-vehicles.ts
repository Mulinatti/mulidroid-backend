import { db } from "../../db"
import { vehicle } from "../../db/schema"

export const getVehicles = async () => {
  const vehicles = await db.select().from(vehicle)

  return { vehicles };
}