import express from "express";
import logger from "morgan";
import { graphqlHTTP } from "express-graphql";

import schema from "./schemas";
const app = express();
const port = process.env.PORT || 2500;

app.use(logger("dev"));
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.listen(port, () => {
  console.log(`Now listening or port ${port}`);
});
