import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.KEY;

export const getTodoById = async (_, { id }, { prisma, userId }) => {
  let returnObj = {
    data: [],
    error: null,
  };
  try {
    if (userId === undefined) return { ...returnObj, error: "unauthorized" };
    const todo = await prisma.todo.findUnique({ where: { id } });
    if (!todo) {
      return { ...returnObj, error: "todos not found" };
    }
    return { ...returnObj, data: todo };
  } catch (error) {
    throw new Error(error);
  }
};

export const getTodosByUser = async (_, __, { req, prisma, userId }) => {
  let returnObj = {
    data: [],
    error: null,
  };
  try {
    if (userId === undefined) return { ...returnObj, error: "unauthorized" };
    const todos = await prisma.todo.findMany({
      where: { byId: userId },
      include: { user: true },
    });
    return { ...returnObj, data: todos };
  } catch (error) {
    return { ...returnObj, error: "horibale" };
  }
};

export const getUserById = async (_, { token }, { req, res, prisma }) => {
  let returnObj = {
    data: {},
    error: null,
  };
  try {
    if (!token) {
      return { ...returnObj, error: "unauthorized" };
    }

    const decoded = jwt.verify(token, SECRET_KEY);
    const userId = decoded.userId;
    if (userId === undefined) {
      res.setHeader(
        "Set-Cookie",
        "token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; Secure;"
      );
      return { ...returnObj, error: "invalid cookie" };
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { todos: true },
    });

    if (!user) {
      return { ...returnObj, error: "user not found" };
    }

    return { ...returnObj, data: user };
  } catch (error) {
    throw new Error(error);
  }
};
