import { db } from "../../db";
import { service } from "../../db/schema";

export const getServices = async () => {
  const services = await db.select().from(service);

  return { services };
};
