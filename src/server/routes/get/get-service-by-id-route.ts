import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod"
import { getServiceById } from "../../../services/get/get-service-by-id"
import z from "zod"

export const getServiceByIdRoute: FastifyPluginAsyncZod = async app => {
	app.get(
		"/service/:serviceId",
		{
			schema: {
				params: z.object({
					serviceId: z.string(),
				}),
			},
		},
		async ({ params }) => {
			const service = await getServiceById(params.serviceId)
			return service
		}
	)
}
