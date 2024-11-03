import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import type { FastifyRequest } from "fastify";
import { getEmployeeById } from "../../../services/get/get-employee-by-id";
import { deleteEmployeeById } from "../../../services/delete/delete-employee-by-id";
import { getVehicleById } from "../../../services/get/get-vehicle-by-id";
import { deleteVehicleById } from "../../../services/delete/delete-vehicle-by-id";

type VehicleIdRequest = FastifyRequest<{
  Params: {
    vehicleId: string;
  };
}>;

export const deleteVehicleByIdRoute: FastifyPluginAsyncZod = async (app) => {
  app.delete("/vehicle/:vehicleId", async ({ params }: VehicleIdRequest) => {
    const vehicleExists = await getVehicleById(params.vehicleId);

    if (vehicleExists) {
      deleteVehicleById(params.vehicleId);
      return "Vehicle Deleted";
    }

    return "Vehicle not found";
  });
};
