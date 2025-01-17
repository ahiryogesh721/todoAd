/* eslint-disable */
import * as types from './graphql';



/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
const documents = {
    "fragment todoTask on Todo {\n  task\n}": types.TodoTaskFragmentDoc,
    "mutation addTodo($task: String!, $done: Boolean!) {\n  addTodo(task: $task, done: $done) {\n    error\n    data {\n      done\n      id\n      task\n    }\n  }\n}\n\nmutation delletTodo($delletTodoId: String!) {\n  delletTodo(id: $delletTodoId) {\n    error\n    data {\n      done\n      id\n      task\n    }\n  }\n}\n\nmutation updateTodo($updateTodoId: String!, $done: Boolean!, $task: String!) {\n  updateTodo(id: $updateTodoId, done: $done, task: $task) {\n    error\n    data {\n      done\n      id\n      task\n    }\n  }\n}": types.AddTodoDocument,
    "mutation signUp($password: String!, $email: String!) {\n  signUp(password: $password, email: $email) {\n    error\n    data {\n      email\n      id\n    }\n  }\n}\n\nmutation login($email: String!, $password: String!) {\n  login(email: $email, password: $password) {\n    error\n    data {\n      email\n      id\n    }\n  }\n}\n\nmutation logoutUser {\n  logoutUser {\n    error\n    data {\n      email\n      id\n    }\n  }\n}": types.SignUpDocument,
    "query getTodosByUser {\n  getTodosByUser {\n    error\n    data {\n      done\n      id\n      task\n    }\n  }\n}\n\nquery getTodoById($getTodoByIdId: String!) {\n  getTodoById(id: $getTodoByIdId) {\n    error\n    data {\n      id\n      done\n      ...todoTask\n    }\n  }\n}": types.GetTodosByUserDocument,
    "query getUserById($token: String!) {\n  getUserById(token: $token) {\n    error\n    data {\n      email\n      id\n    }\n  }\n}": types.GetUserByIdDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment todoTask on Todo {\n  task\n}"): typeof import('./graphql').TodoTaskFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation addTodo($task: String!, $done: Boolean!) {\n  addTodo(task: $task, done: $done) {\n    error\n    data {\n      done\n      id\n      task\n    }\n  }\n}\n\nmutation delletTodo($delletTodoId: String!) {\n  delletTodo(id: $delletTodoId) {\n    error\n    data {\n      done\n      id\n      task\n    }\n  }\n}\n\nmutation updateTodo($updateTodoId: String!, $done: Boolean!, $task: String!) {\n  updateTodo(id: $updateTodoId, done: $done, task: $task) {\n    error\n    data {\n      done\n      id\n      task\n    }\n  }\n}"): typeof import('./graphql').AddTodoDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation signUp($password: String!, $email: String!) {\n  signUp(password: $password, email: $email) {\n    error\n    data {\n      email\n      id\n    }\n  }\n}\n\nmutation login($email: String!, $password: String!) {\n  login(email: $email, password: $password) {\n    error\n    data {\n      email\n      id\n    }\n  }\n}\n\nmutation logoutUser {\n  logoutUser {\n    error\n    data {\n      email\n      id\n    }\n  }\n}"): typeof import('./graphql').SignUpDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query getTodosByUser {\n  getTodosByUser {\n    error\n    data {\n      done\n      id\n      task\n    }\n  }\n}\n\nquery getTodoById($getTodoByIdId: String!) {\n  getTodoById(id: $getTodoByIdId) {\n    error\n    data {\n      id\n      done\n      ...todoTask\n    }\n  }\n}"): typeof import('./graphql').GetTodosByUserDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query getUserById($token: String!) {\n  getUserById(token: $token) {\n    error\n    data {\n      email\n      id\n    }\n  }\n}"): typeof import('./graphql').GetUserByIdDocument;


export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}
