import fastify from "fastify"
import { getServicesRoute } from "./routes/get/get-services-route"
import { getEmployeeRoute } from "./routes/get/get-employees-route"
import { getVehiclesRoute } from "./routes/get/get-vehicles-route"
import { serializerCompiler, validatorCompiler } from "fastify-type-provider-zod"
import { createEmployeesRoute } from "./routes/post/create-employee-route"
import { createServiceRoute } from "./routes/post/create-service-route"
import { createVehicleRoute } from "./routes/post/create-vehicle-route"
import { getServiceByIdRoute } from "./routes/get/get-service-by-id-route"
import { getEmployeeByIdRoute } from "./routes/get/get-employee-by-id-route"
import { env } from "../env"
import { deleteEmployeeByIdRoute } from "./routes/delete/delete-employee-by-id-route"
import { deleteServiceByIdRoute } from "./routes/delete/delete-service-by-id-route"
import { deleteVehicleByIdRoute } from "./routes/delete/delete-vehicle-by-id-route"

const app = fastify()

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(getEmployeeRoute)
app.register(getServicesRoute)
app.register(getVehiclesRoute)

app.register(getServiceByIdRoute)
app.register(getEmployeeByIdRoute)

app.register(createEmployeesRoute)
app.register(createServiceRoute)
app.register(createVehicleRoute)

app.register(deleteEmployeeByIdRoute)
app.register(deleteServiceByIdRoute)
app.register(deleteVehicleByIdRoute)

app
	.listen({
		host: "0.0.0.0",
		port: Number.parseInt(env.PORT),
	})
	.then(() => {
		console.log(`Server Running at PORT ${env.PORT}`)
	})
