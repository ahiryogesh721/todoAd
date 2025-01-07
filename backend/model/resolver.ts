import { getTodoById, getTodosByUser, getUserById } from "./querys";
import {
  addTodo,
  delletTodo,
  login,
  logoutUser,
  removeUser,
  signUp,
  updateTodo,
} from "./mutations";

require("dotenv").config();

const resolvers = {
  Query: {
    say: () => "hello",
    getTodoById,
    getTodosByUser,
    getUserById,
  },
  Mutation: {
    signUp,
    login,
    logoutUser,
    removeUser,
    addTodo,
    updateTodo,
    delletTodo,
  },
};

module.exports = { resolvers };
