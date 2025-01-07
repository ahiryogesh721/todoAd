import { PrismaClient } from "@prisma/client";
import path from "path";

const express = require("express");
export const app = express();

const rootRoute = require("./routes/rootRoute");

require("dotenv").config();
const cors = require("cors");
const json = require("body-parser").json();
const fs = require("fs");
import cookieParser from "cookie-parser";

const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const { resolvers } = require("./model/resolver");

import jwt from "jsonwebtoken";

const PORT = process.env.PORT;

const prisma = new PrismaClient();
const SECRET_KEY = process.env.KEY;

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

const typeDefs = fs.readFileSync(
  path.join(__dirname, "model", "Schema.graphql"),
  "utf-8"
);

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

app.use("/", rootRoute);

async function contextFun({ req, res }) {
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
  await server.start();
  app.use("/DB", expressMiddleware(server, { context: contextFun }));
};
dbServerStart();

app.listen(PORT, () => {
  console.log(`backend server is runing on PORT:${PORT}`);
});
