/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { GraphQLClient, RequestOptions } from "graphql-request";
import gql from "graphql-tag";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
    };
type GraphQLClientRequestHeaders = RequestOptions["requestHeaders"];
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
};

export type Mutation = {
  __typename?: "Mutation";
  addTodo: TodoRes;
  delletTodo: TodoRes;
  login: UserRes;
  logoutUser: UserRes;
  removeUser: UserRes;
  signUp: UserRes;
  updateTodo: TodoRes;
};

export type MutationAddTodoArgs = {
  done: Scalars["Boolean"]["input"];
  task: Scalars["String"]["input"];
};

export type MutationDelletTodoArgs = {
  id: Scalars["String"]["input"];
};

export type MutationLoginArgs = {
  email: Scalars["String"]["input"];
  password: Scalars["String"]["input"];
};

export type MutationRemoveUserArgs = {
  password: Scalars["String"]["input"];
};

export type MutationSignUpArgs = {
  email: Scalars["String"]["input"];
  password: Scalars["String"]["input"];
};

export type MutationUpdateTodoArgs = {
  done: Scalars["Boolean"]["input"];
  id: Scalars["String"]["input"];
  task: Scalars["String"]["input"];
};

export type Query = {
  __typename?: "Query";
  getTodoById: TodoRes;
  getTodosByUser: TodosRes;
  getUserById: UserRes;
};

export type QueryGetTodoByIdArgs = {
  id: Scalars["String"]["input"];
};

export type QueryGetUserByIdArgs = {
  token: Scalars["String"]["input"];
};

export type Todo = {
  __typename?: "Todo";
  createdAt: Scalars["String"]["output"];
  done: Scalars["Boolean"]["output"];
  id: Scalars["ID"]["output"];
  task: Scalars["String"]["output"];
  user: User;
};

export type TodoRes = {
  __typename?: "TodoRes";
  data?: Maybe<Todo>;
  error?: Maybe<Scalars["String"]["output"]>;
};

export type TodosRes = {
  __typename?: "TodosRes";
  data?: Maybe<Array<Todo>>;
  error?: Maybe<Scalars["String"]["output"]>;
};

export type User = {
  __typename?: "User";
  createdAt: Scalars["String"]["output"];
  email: Scalars["String"]["output"];
  id: Scalars["ID"]["output"];
  password: Scalars["String"]["output"];
  todos: Array<Todo>;
};

export type UserRes = {
  __typename?: "UserRes";
  data?: Maybe<User>;
  error?: Maybe<Scalars["String"]["output"]>;
};

export type TodoTaskFragment = { __typename?: "Todo"; task: string };

export type AddTodoMutationVariables = Exact<{
  task: Scalars["String"]["input"];
  done: Scalars["Boolean"]["input"];
}>;

export type AddTodoMutation = {
  __typename?: "Mutation";
  addTodo: {
    __typename?: "TodoRes";
    error?: string | null;
    data?: {
      __typename?: "Todo";
      done: boolean;
      id: string;
      task: string;
    } | null;
  };
};

export type DelletTodoMutationVariables = Exact<{
  delletTodoId: Scalars["String"]["input"];
}>;

export type DelletTodoMutation = {
  __typename?: "Mutation";
  delletTodo: {
    __typename?: "TodoRes";
    error?: string | null;
    data?: {
      __typename?: "Todo";
      done: boolean;
      id: string;
      task: string;
    } | null;
  };
};

export type UpdateTodoMutationVariables = Exact<{
  updateTodoId: Scalars["String"]["input"];
  done: Scalars["Boolean"]["input"];
  task: Scalars["String"]["input"];
}>;

export type UpdateTodoMutation = {
  __typename?: "Mutation";
  updateTodo: {
    __typename?: "TodoRes";
    error?: string | null;
    data?: {
      __typename?: "Todo";
      done: boolean;
      id: string;
      task: string;
    } | null;
  };
};

export type SignUpMutationVariables = Exact<{
  password: Scalars["String"]["input"];
  email: Scalars["String"]["input"];
}>;

export type SignUpMutation = {
  __typename?: "Mutation";
  signUp: {
    __typename?: "UserRes";
    error?: string | null;
    data?: { __typename?: "User"; email: string; id: string } | null;
  };
};

export type LoginMutationVariables = Exact<{
  email: Scalars["String"]["input"];
  password: Scalars["String"]["input"];
}>;

export type LoginMutation = {
  __typename?: "Mutation";
  login: {
    __typename?: "UserRes";
    error?: string | null;
    data?: { __typename?: "User"; email: string; id: string } | null;
  };
};

export type LogoutUserMutationVariables = Exact<{ [key: string]: never }>;

export type LogoutUserMutation = {
  __typename?: "Mutation";
  logoutUser: {
    __typename?: "UserRes";
    error?: string | null;
    data?: { __typename?: "User"; email: string; id: string } | null;
  };
};

export type GetTodosByUserQueryVariables = Exact<{ [key: string]: never }>;

export type GetTodosByUserQuery = {
  __typename?: "Query";
  getTodosByUser: {
    __typename?: "TodosRes";
    error?: string | null;
    data?: Array<{
      __typename?: "Todo";
      done: boolean;
      id: string;
      task: string;
    }> | null;
  };
};

export type GetTodoByIdQueryVariables = Exact<{
  getTodoByIdId: Scalars["String"]["input"];
}>;

export type GetTodoByIdQuery = {
  __typename?: "Query";
  getTodoById: {
    __typename?: "TodoRes";
    error?: string | null;
    data?: {
      __typename?: "Todo";
      id: string;
      done: boolean;
      task: string;
    } | null;
  };
};

export type GetUserByIdQueryVariables = Exact<{
  token: Scalars["String"]["input"];
}>;

export type GetUserByIdQuery = {
  __typename?: "Query";
  getUserById: {
    __typename?: "UserRes";
    error?: string | null;
    data?: { __typename?: "User"; email: string; id: string } | null;
  };
};

export const TodoTaskFragmentDoc = gql`
  fragment todoTask on Todo {
    task
  }
`;
export const AddTodoDocument = gql`
  mutation addTodo($task: String!, $done: Boolean!) {
    addTodo(task: $task, done: $done) {
      error
      data {
        done
        id
        task
      }
    }
  }
`;
export const DelletTodoDocument = gql`
  mutation delletTodo($delletTodoId: String!) {
    delletTodo(id: $delletTodoId) {
      error
      data {
        done
        id
        task
      }
    }
  }
`;
export const UpdateTodoDocument = gql`
  mutation updateTodo($updateTodoId: String!, $done: Boolean!, $task: String!) {
    updateTodo(id: $updateTodoId, done: $done, task: $task) {
      error
      data {
        done
        id
        task
      }
    }
  }
`;
export const SignUpDocument = gql`
  mutation signUp($password: String!, $email: String!) {
    signUp(password: $password, email: $email) {
      error
      data {
        email
        id
      }
    }
  }
`;
export const LoginDocument = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      error
      data {
        email
        id
      }
    }
  }
`;
export const LogoutUserDocument = gql`
  mutation logoutUser {
    logoutUser {
      error
      data {
        email
        id
      }
    }
  }
`;
export const GetTodosByUserDocument = gql`
  query getTodosByUser {
    getTodosByUser {
      error
      data {
        done
        id
        task
      }
    }
  }
`;
export const GetTodoByIdDocument = gql`
  query getTodoById($getTodoByIdId: String!) {
    getTodoById(id: $getTodoByIdId) {
      error
      data {
        id
        done
        ...todoTask
      }
    }
  }
  ${TodoTaskFragmentDoc}
`;
export const GetUserByIdDocument = gql`
  query getUserById($token: String!) {
    getUserById(token: $token) {
      error
      data {
        email
        id
      }
    }
  }
`;

export type SdkFunctionWrapper = <T>(
  action: (requestHeaders?: Record<string, string>) => Promise<T>,
  operationName: string,
  operationType?: string,
  variables?: any
) => Promise<T>;

const defaultWrapper: SdkFunctionWrapper = (
  action,
  _operationName,
  _operationType,
  _variables
) => action();

export function getSdk(
  client: GraphQLClient,
  withWrapper: SdkFunctionWrapper = defaultWrapper
) {
  return {
    addTodo(
      variables: AddTodoMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders
    ): Promise<AddTodoMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<AddTodoMutation>(AddTodoDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        "addTodo",
        "mutation",
        variables
      );
    },
    delletTodo(
      variables: DelletTodoMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders
    ): Promise<DelletTodoMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<DelletTodoMutation>(DelletTodoDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        "delletTodo",
        "mutation",
        variables
      );
    },
    updateTodo(
      variables: UpdateTodoMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders
    ): Promise<UpdateTodoMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<UpdateTodoMutation>(UpdateTodoDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        "updateTodo",
        "mutation",
        variables
      );
    },
    signUp(
      variables: SignUpMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders
    ): Promise<SignUpMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<SignUpMutation>(SignUpDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        "signUp",
        "mutation",
        variables
      );
    },
    login(
      variables: LoginMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders
    ): Promise<LoginMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<LoginMutation>(LoginDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        "login",
        "mutation",
        variables
      );
    },
    logoutUser(
      variables?: LogoutUserMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders
    ): Promise<LogoutUserMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<LogoutUserMutation>(LogoutUserDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        "logoutUser",
        "mutation",
        variables
      );
    },
    getTodosByUser(
      variables?: GetTodosByUserQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders
    ): Promise<GetTodosByUserQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetTodosByUserQuery>(
            GetTodosByUserDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        "getTodosByUser",
        "query",
        variables
      );
    },
    getTodoById(
      variables: GetTodoByIdQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders
    ): Promise<GetTodoByIdQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetTodoByIdQuery>(GetTodoByIdDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        "getTodoById",
        "query",
        variables
      );
    },
    getUserById(
      variables: GetUserByIdQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders
    ): Promise<GetUserByIdQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetUserByIdQuery>(GetUserByIdDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        "getUserById",
        "query",
        variables
      );
    },
  };
}
export type Sdk = ReturnType<typeof getSdk>;
