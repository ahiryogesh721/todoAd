import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import isE from "isemail";
require("dotenv").config();

const SECRET_KEY = process.env.KEY;

function isAuth(user) {
  if (!user) throw new Error("auth failed");
}

const resolvers = {
  Query: {
    say: () => "hello",
    getUser: async (_, { id }, { userr, prisma }) => {
      try {
        isAuth(userr);
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
    getAllUsers: async (_, __, { userr, prisma }) => {
      try {
        isAuth(userr);
        const allUsers = await prisma.user.findMany();
        return allUsers;
      } catch (error) {
        throw new Error(error.message);
      }
    },
    getAllTodo: async (_, __, { userr, prisma }) => {
      try {
        isAuth(userr);
        const allTodo = await prisma.todo.findMany({ include: { user: true } });
        return allTodo;
      } catch (error) {
        throw new Error(error.message);
      }
    },
  },
  Mutation: {
    signup: async (_, { email, password }, { prisma }) => {
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
          include: { todos: true },
        });

        const token = jwt.sign({ userId: user.id }, SECRET_KEY, {
          expiresIn: "1h",
        });

        return { token, user };
      } catch (error) {
        throw new Error(error.message);
      }
    },
    login: async (_, { email, password }, { prisma }) => {
      try {
        if (email === undefined || password === undefined) {
          throw new Error("email and password is req");
        }
        if (!isE.validate(email)) {
          throw new Error("email in not valid");
        }
        const user = await prisma.user.findUnique({
          where: { email },
          include: { todos: true },
        });
        if (!user) {
          throw new Error("user not found");
        }
        const isAllowed = await bcrypt.compare(password, user.password);

        if (!isAllowed) {
          throw new Error("password does not match");
        }
        const token = jwt.sign({ userId: user.id }, SECRET_KEY, SECRET_KEY, {
          expiresIn: "1h",
        });

        return { token, user };
      } catch (error) {
        throw new Error(error.message);
      }
    },
    removeUser: async (_, { id, password }, { userr, prisma }) => {
      try {
        isAuth(userr);
        let userDB = await prisma.user.findUnique({ where: { id } });
        const isAllowed = await bcrypt.compare(password, userDB.password);
        if (!isAllowed) throw new Error("pasword dont match");
        const user = await prisma.user.delete({
          where: { id },
          include: { todos: true },
        });
        return user;
      } catch (error) {
        throw new Error(error.message);
      }
    },
    addTodo: async (_, { userId, task, done, pvt }, { userr, prisma }) => {
      try {
        isAuth(userr);
        return await prisma.todo.create({
          data: {
            task,
            done,
            pvt,
            user: { connect: { id: userId } },
          },
        });
      } catch (error) {
        throw new Error(error.message);
      }
    },
    togaleDone: async (_, { id, done, pvt }, { userr, prisma }) => {
      try {
        isAuth(userr);
        const user = await prisma.todo.findUnique({
          where: { id },
        });
        let data = { ...user };
        if (pvt) data.pvt = pvt;
        if (done) data.done = done;
        return await prisma.todo?.update({
          where: { id },
          data: {},
        });
      } catch (error) {
        throw new Error(error.message);
      }
    },
    updateTodo: async (_, { id, task, done, pvt }, { userr, prisma }) => {
      try {
        isAuth(userr);
        const user = await prisma.todo.findUnique({ where: { id } });
        let data = { ...user };
        if (task) data.task = task;
        if (done) data.done = done;
        if (pvt) data.pvt = pvt;
        return await prisma.todo.update({
          where: { id },
          data,
        });
      } catch (error) {
        throw new Error(error.message);
      }
    },
    delletTodo: async (_, { id }, { userr, prisma }) => {
      try {
        isAuth(userr);
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
