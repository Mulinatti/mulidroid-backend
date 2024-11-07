import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod"
import { getServiceById } from "../../../services/get/get-service-by-id"
import z from "zod"
import { getServicesByEmployeeId } from "../../../services/get/get-services-by-employee-id"
import { getEmployeeById } from "../../../services/get/get-employee-by-id"

export const getServicesByEmployeeIdRoute: FastifyPluginAsyncZod = async app => {
	app.get(
		"/service/employee/:employeeId",
		{
			schema: {
				params: z.object({
					employeeId: z.string(),
				}),
			},
		},
		async ({ params }) => {
			const services = await getServicesByEmployeeId(params.employeeId)
			const employeeExists = await getEmployeeById(params.employeeId)

			if (!employeeExists.id) throw new Error("Employee not found")

			return services
		}
	)
}
