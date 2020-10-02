import logger from "morgan";
import express from "express";
import { graphqlHTTP } from "express-graphql";

import schema from "./schema";
const app = express();
app.use(logger("dev"));
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

export default app;
