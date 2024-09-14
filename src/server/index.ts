import fastify from "fastify";
import { getEmployees } from "../services/get/get-employees";
import { getServices } from "../services/get/get-services";

const app = fastify();

app.get("/employees", async () => {
  const result = await getEmployees();
  return result;
});

app.get("/services", async () => {
  const result = await getServices();
  return result;
});

app
  .listen({
    port: 4040,
  })
  .then(() => {
    console.log("Server Running at PORT 4040");
  });
