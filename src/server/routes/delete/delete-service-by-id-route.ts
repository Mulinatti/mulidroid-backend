import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod"
import type { FastifyRequest } from "fastify"
import { getServiceById } from "../../../services/get/get-service-by-id"
import { deleteServiceById } from "../../../services/delete/delete-service-by-id"

type ServiceIdRequest = FastifyRequest<{
	Params: {
		serviceId: string
	}
}>

export const deleteServiceByIdRoute: FastifyPluginAsyncZod = async app => {
	app.delete("/service/:serviceId", async ({ params }: ServiceIdRequest) => {
		const serviceExists = await getServiceById(params.serviceId)

		if (serviceExists.id) {
			await deleteServiceById(params.serviceId)
			return "Service deleted"
		}

		return "Service not found"
	})
}
