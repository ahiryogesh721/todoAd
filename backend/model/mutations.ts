import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import isE from "isemail";

const SECRET_KEY = process.env.KEY;

export const signUp = async (_, { email, password }, { prisma, res }) => {
  let returnObj = {
    data: {},
    error: null,
  };

  try {
    if (email === undefined || password === undefined) {
      //throw new Error("email and pasword is req");
      return { ...returnObj, error: "email and pasword is req" };
    }

    if (!isE.validate(email)) {
      //throw new Error("not valid email");
      return { ...returnObj, error: "email and pasword is req" };
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      //throw new Error("User already exists.");
      return { ...returnObj, error: "email already exist" };
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

    res.cookie("token", token, { httpOnly: true, secure: true });

    return { ...returnObj, data: user };
  } catch (error) {
    //throw new Error(error);
    return {
      ...returnObj,
      error: "horibale",
    };
  }
};

export const login = async (_, { email, password }, { prisma, res }) => {
  let returnObj = {
    data: {},
    error: null,
  };
  try {
    if (email === undefined || password === undefined) {
      return { ...returnObj, error: "email and password is req" };
    }
    if (!isE.validate(email)) {
      return { ...returnObj, error: "email in not valid" };
    }
    const user = await prisma.user.findUnique({
      where: { email },
      include: { todos: true },
    });
    if (!user) {
      return { ...returnObj, error: "user not found" };
    }
    const isAllowed = await bcrypt.compare(password, user.password);

    if (!isAllowed) {
      return { ...returnObj, error: "password does not match" };
    }
    const token = jwt.sign({ userId: user.id }, SECRET_KEY, {
      expiresIn: "1h",
    });
    res.cookie("token", token, { httpOnly: true, secure: true });
    return { ...returnObj, data: user };
  } catch (error) {
    throw new Error(error);
  }
};
export const logoutUser = async (_, __, { prisma, res, userId }) => {
  let returnObj = {
    data: {},
    error: null,
  };
  try {
    if (userId === undefined) {
      return { ...returnObj, error: "unauthorized" };
    }
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { todos: true },
    });
    res.clearCookie("token");
    return { ...returnObj, data: user };
  } catch (error) {
    throw new Error(error);
  }
};

export const removeUser = async (_, { password }, { prisma, userId }) => {
  let returnObj = {
    data: {},
    error: null,
  };
  try {
    let userDB = await prisma.user.findUnique({ where: { id: userId } });
    const isAllowed = await bcrypt.compare(password, userDB.password);
    if (!isAllowed) {
      return { ...returnObj, error: "password does not match" };
    }
    const user = await prisma.user.delete({
      where: { id: userId },
      include: { todos: true },
    });
    return { ...returnObj, data: user };
  } catch (error) {
    throw new Error(error);
  }
};

export const addTodo = async (_, { task, done }, { prisma, userId }) => {
  let returnObj = {
    data: [],
    error: null,
  };
  try {
    if (userId === undefined) {
      return { ...returnObj, error: "unauthorized" };
    }
    const todo = await prisma.todo.create({
      data: {
        task,
        done,

        user: { connect: { id: userId } },
      },
    });
    return { ...returnObj, data: todo };
  } catch (error) {
    throw new Error(error);
  }
};

export const updateTodo = async (_, { id, task, done }, { prisma, userId }) => {
  let returnObj = {
    data: [],
    error: null,
  };
  try {
    const todo = await prisma.todo.findUnique({
      where: { id: +id },
    });

    if (todo === undefined || todo?.byId !== userId) {
      return { ...returnObj, error: "Todo not found or unauthorized." };
    }

    const todo1 = await prisma.todo.update({
      where: { id: +id },
      data: { task, done },
    });

    return { ...returnObj, data: todo1 };
  } catch (error) {
    throw new Error(error);
  }
};

export const delletTodo = async (_, { id }, { prisma, userId }) => {
  let returnObj = {
    data: [],
    error: null,
  };
  try {
    const todo = await prisma.todo.findUnique({ where: { id } });

    if (todo === undefined || todo?.byId !== userId) {
      return { ...returnObj, error: "Todo not found or unauthorized." };
    }

    const todo1 = await prisma.todo.delete({ where: { id } });
    return { ...returnObj, data: todo1 };
  } catch (error) {
    throw new Error(error);
  }
};
