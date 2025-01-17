import { Resolver, Query, Mutation, Arg, Ctx } from "type-graphql";
import { User, UserRes } from "./User";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import isE from "isemail";
require("dotenv").config();

const SECRET_KEY = process.env.SECRET_KEY;
@Resolver(User)
export class UserResolver {
  @Query(() => UserRes)
  async getUserById(
    @Arg("token") token: string,
    @Ctx() { prisma, res }: any
  ): Promise<{ error: string | null; data: User | null }> {
    let returnObj = {
      data: null,
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
  }
  @Mutation(() => UserRes)
  async signUp(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Ctx() { prisma, res }: any
  ): Promise<UserRes> {
    let returnObj = {
      data: null,
      error: null,
    };

    try {
      if (email === undefined || password === undefined) {
        return { ...returnObj, error: "email and pasword is req" };
      }

      if (!isE.validate(email)) {
        return { ...returnObj, error: "email and pasword is req" };
      }

      const existingUser = await prisma.user.findUnique({ where: { email } });
      if (existingUser) {
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
      throw new Error("no no");
    }
  }

  @Mutation(() => UserRes)
  async login(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Ctx() { prisma, res }: any
  ): Promise<UserRes> {
    let returnObj = {
      data: null,
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
  }

  @Mutation(() => UserRes)
  async logoutUser(@Ctx() { prisma, res, userId }: any): Promise<UserRes> {
    let returnObj = {
      data: null,
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
  }

  @Mutation(() => UserRes)
  async removeUser(
    @Arg("password") password: string,
    @Ctx() { prisma, userId }: any
  ): Promise<UserRes> {
    let returnObj = {
      data: null,
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
  }
}
