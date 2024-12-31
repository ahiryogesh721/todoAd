import { PrismaClient } from "@prisma/client";
import path from "path";

const express = require("express");
export const app = express();

const rootRoute = require("./routes/rootRoute");
const userRoute = require("./routes/userRoute");

require("dotenv").config();
const cors = require("cors");
const json = require("body-parser").json();
const fs = require("fs");

const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const { resolvers } = require("./model/resolver");

const PORT = process.env.PORT;
const prisma = new PrismaClient();

app.use(
  cors({
    origin: (origin, callback) => {
      return callback(null, true);
    },
  })
);
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true);
  next();
});
app.use(json);
app.use(express.urlencoded({ extended: false }));

const typeDefs = fs.readFileSync(
  path.join(__dirname, "model", "Schema.graphql"),
  "utf-8"
);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    return {
      ...req,
      prisma,
    };
  },
});

app.use("/users", userRoute);
app.use("/", rootRoute);

const dbServerStart = async () => {
  await server.start();
  app.use("/DB", expressMiddleware(server));
};
dbServerStart();

app.listen(PORT, () => {
  console.log(`backend server is runing on PORT:${PORT}`);
});
