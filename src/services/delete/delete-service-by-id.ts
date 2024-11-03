import { eq } from "drizzle-orm";
import { db } from "../../db";
import { service } from "../../db/schema";

export const deleteServiceById = async (serviceId: string) => {
  await db.delete(service).where(eq(service.id, serviceId));
}