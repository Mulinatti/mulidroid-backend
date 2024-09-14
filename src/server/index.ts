import fastify from "fastify";
import { getServicesRoute } from "./routes/get-services";
import { getEmployeesRoute } from "./routes/get-employees";
import { getVehiclesRoute } from "./routes/get-vehicles";

const app = fastify();

app.register(getEmployeesRoute);
app.register(getServicesRoute);
app.register(getVehiclesRoute);

app
  .listen({
    port: 4040,
  })
  .then(() => {
    console.log("Server Running at PORT 4040");
  });
