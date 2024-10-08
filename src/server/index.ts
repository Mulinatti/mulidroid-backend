import fastify from "fastify";
import { getServicesRoute } from "./routes/get-services-route";
import { getEmployeesRoute } from "./routes/get-employees-route";
import { getVehiclesRoute } from "./routes/get-vehicles-route";
import { serializerCompiler, validatorCompiler } from "fastify-type-provider-zod";
import { createEmployeesRoute } from "./routes/create-employee-route";
import { createServiceRoute } from "./routes/create-service-route";
import { createVehicleRoute } from "./routes/create-vehicle-route";
import { getServiceByIdRoute } from "./routes/get-service-by-id-route";

const app = fastify();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(getEmployeesRoute);
app.register(getServicesRoute);
app.register(getVehiclesRoute);

app.register(getServiceByIdRoute);

app.register(createEmployeesRoute);
app.register(createServiceRoute);
app.register(createVehicleRoute);

app
  .listen({
    port: 4040,
  })
  .then(() => {
    console.log("Server Running at PORT 4040");
  });
