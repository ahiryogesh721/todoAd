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

import jwt from "jsonwebtoken";
import { error } from "console";

const PORT = process.env.PORT;

const prisma = new PrismaClient();
const SECRET_KEY = process.env.KEY;

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
});

app.use("/users", userRoute);
app.use("/", rootRoute);

async function contextFun({ req }) {
  let obj = { prisma };
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) throw new Error("token is not provided");

  const userr = jwt.verify(token, SECRET_KEY);
  if (userr) {
    return { ...obj, userr };
  } else return { ...obj, userr: null };
}

const dbServerStart = async () => {
  await server.start();
  app.use("/DB", expressMiddleware(server, { context: contextFun }));
};
dbServerStart();

app.listen(PORT, () => {
  console.log(`backend server is runing on PORT:${PORT}`);
});
