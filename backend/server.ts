import { PrismaClient } from "@prisma/client";
import path from "path";

const express = require("express");
export const app = express();

const rootRoute = require("./routes/rootRoute");

require("dotenv").config();
require("reflect-metadata");

const cors = require("cors");
const json = require("body-parser").json();
const fs = require("fs");
import cookieParser from "cookie-parser";

const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");

import jwt from "jsonwebtoken";
import { buildSchema } from "type-graphql";
import { UserResolver } from "./model/userResolver";
import { TodoResolver } from "./model/todoResolver";

const PORT = process.env.PORT;

const prisma = new PrismaClient();
const SECRET_KEY = process.env.SECRET_KEY;

app.use(
  cors({
    origin: (origin, callback) => {
      return callback(null, true);
    },
    credentials: true,
  })
);
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true);
  next();
});
app.use(json);
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/", rootRoute);

async function contextFun({ req, res }: { req: any; res: any }) {
  let obj = { prisma, req, res };

  const token = req?.cookies?.token;

  if (!token) {
    return obj;
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    return { ...obj, userId: decoded.userId };
  } catch (error) {
    return { ...obj };
  }
}

const dbServerStart = async () => {
  const schema = await buildSchema({
    resolvers: [UserResolver, TodoResolver],
    emitSchemaFile: true,
    validate: false,
  });

  const server = new ApolloServer({
    schema,
  });

  await server.start();
  app.use("/DB", expressMiddleware(server, { context: contextFun }));
};
dbServerStart();

app.listen(PORT, () => {
  console.log(`backend server is runing on PORT:${PORT}`);
});
