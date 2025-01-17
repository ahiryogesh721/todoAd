import { Resolver, Query, Mutation, Arg, Ctx } from "type-graphql";
import { Todo, TodosRes } from "./Todo";
import { TodoRes } from "./Todo";

@Resolver(Todo)
export class TodoResolver {
  @Query(() => TodoRes)
  async getTodoById(
    @Arg("id") id: string,
    @Ctx() { prisma, userId }: any
  ): Promise<TodoRes> {
    let returnObj = {
      data: null,
      error: null,
    };
    try {
      if (userId === undefined) return { ...returnObj, error: "unauthorized" };
      const todo = await prisma.todo.findUnique({ where: { id: +id } });
      if (!todo) {
        return { ...returnObj, error: "todos not found" };
      }
      return { ...returnObj, data: todo };
    } catch (error) {
      throw new Error(error);
    }
  }

  @Query(() => TodosRes)
  async getTodosByUser(@Ctx() { prisma, userId }: any): Promise<TodosRes> {
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
  }

  @Mutation(() => TodoRes)
  async addTodo(
    @Arg("task") task: string,
    @Arg("done") done: boolean,
    @Ctx() { prisma, userId }: any
  ): Promise<TodoRes> {
    let returnObj = {
      data: null,
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
  }

  @Mutation(() => TodoRes)
  async updateTodo(
    @Arg("id") id: string,
    @Arg("task") task: string,
    @Arg("done") done: boolean,
    @Ctx() { prisma, userId }: any
  ): Promise<TodoRes> {
    let returnObj = {
      data: null,
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
  }

  @Mutation(() => TodoRes)
  async delletTodo(
    @Arg("id") id: string,
    @Ctx() { prisma, userId }: any
  ): Promise<TodoRes> {
    let returnObj = {
      data: null,
      error: null,
    };
    try {
      const todo = await prisma.todo.findUnique({ where: { id: +id } });

      if (todo === undefined || todo?.byId !== userId) {
        return { ...returnObj, error: "Todo not found or unauthorized." };
      }

      const todo1 = await prisma.todo.delete({ where: { id: +id } });
      return { ...returnObj, data: todo1 };
    } catch (error) {
      throw new Error(error);
    }
  }
}
