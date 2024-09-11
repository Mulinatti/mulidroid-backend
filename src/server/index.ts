import fastify from "fastify";

const app = fastify();

app.listen({
  port: 4040
})
.then(() => {
  console.log("Server Running at PORT 4040")
});