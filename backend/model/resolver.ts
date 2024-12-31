import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import isE from "isemail";
require("dotenv").config();

const prisma = new PrismaClient();
const SECRET_KEY = process.env.KEY;

const resolvers = {
  Query: {
    say: () => "hello",
    getUser: async (_, { id }, context) => {
      try {
        const user = await prisma.user.findUnique({
          where: { id },
          include: { todos: true },
        });
        if (!user) throw new Error("User not found");
        return user;
      } catch (error) {
        throw new Error(error.message);
      }
    },
    getAllUsers: async () => {
      const allUsers = await prisma.user.findMany();
      return allUsers;
    },
    getAllTodo: async () => {
      const allTodo = await prisma.todo.findMany();
      return allTodo;
    },
  },
  Mutation: {
    signup: async (_, { email, password }) => {
      try {
        if (email === undefined || password === undefined) {
          throw new Error("email and pasword is req");
        }

        if (!isE.validate(email)) {
          throw new Error("not valid email");
        }

        const hashPass = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
          data: {
            email,
            password: hashPass,
          },
        });

        const token = jwt.sign({ userId: user.id }, SECRET_KEY);

        return { token, user };
      } catch (error) {
        throw new Error(error.message);
      }
    },
    login: async (_, { email, password }) => {
      try {
        if (email === undefined || password === undefined) {
          throw new Error("email and password is req");
        }
        if (!isE.validate(email)) {
          throw new Error("email in not valid");
        }
        const user = await prisma.user.findUnique({
          where: { email },
        });
        if (!user) {
          throw new Error("user not found");
        }
        const isAllowed = await bcrypt.compare(password, user.password);

        if (!isAllowed) {
          throw new Error("password does not match");
        }
        const token = jwt.sign({ userId: user.id }, SECRET_KEY);

        return { token, user };
      } catch (error) {
        throw new Error(error.message);
      }
    },
    addTodo: async (_, { userId, task, done }) => {
      try {
        return await prisma.todo.create({
          data: {
            task,
            done,
            user: { connect: { id: userId } },
          },
        });
      } catch (error) {
        throw new Error(error.message);
      }
    },
    togaleDone: async (_, { id }) => {
      try {
        const user = await prisma.todo.findUnique({
          where: { id },
        });
        console.log(user);
        return await prisma.todo?.update({
          where: { id },
          data: { done: !user.done },
        });
      } catch (error) {
        throw new Error(error.message);
      }
    },
    updateTodo: async (_, { id, task, done }) => {
      try {
        const user = await prisma.todo.findUnique({ where: { id } });
        return await prisma.todo.update({
          where: { id },
          data: { ...user, task, done },
        });
      } catch (error) {
        throw new Error(error.message);
      }
    },
    delletTodo: async (_, { id }) => {
      try {
        const todo = await prisma.todo.delete({
          where: { id },
        });
        return todo;
      } catch (error) {
        throw new Error(error.message);
      }
    },
  },
};

module.exports = { resolvers };
