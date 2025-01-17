/* eslint-disable */
import { DocumentTypeDecoration } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Mutation = {
  __typename?: 'Mutation';
  addTodo: TodoRes;
  delletTodo: TodoRes;
  login: UserRes;
  logoutUser: UserRes;
  removeUser: UserRes;
  signUp: UserRes;
  updateTodo: TodoRes;
};


export type MutationAddTodoArgs = {
  done: Scalars['Boolean']['input'];
  task: Scalars['String']['input'];
};


export type MutationDelletTodoArgs = {
  id: Scalars['String']['input'];
};


export type MutationLoginArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationRemoveUserArgs = {
  password: Scalars['String']['input'];
};


export type MutationSignUpArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationUpdateTodoArgs = {
  done: Scalars['Boolean']['input'];
  id: Scalars['String']['input'];
  task: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  getTodoById: TodoRes;
  getTodosByUser: TodosRes;
  getUserById: UserRes;
};


export type QueryGetTodoByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryGetUserByIdArgs = {
  token: Scalars['String']['input'];
};

export type Todo = {
  __typename?: 'Todo';
  createdAt: Scalars['String']['output'];
  done: Scalars['Boolean']['output'];
  id: Scalars['ID']['output'];
  task: Scalars['String']['output'];
  user: User;
};

export type TodoRes = {
  __typename?: 'TodoRes';
  data?: Maybe<Todo>;
  error?: Maybe<Scalars['String']['output']>;
};

export type TodosRes = {
  __typename?: 'TodosRes';
  data?: Maybe<Array<Todo>>;
  error?: Maybe<Scalars['String']['output']>;
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['String']['output'];
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  password: Scalars['String']['output'];
  todos: Array<Todo>;
};

export type UserRes = {
  __typename?: 'UserRes';
  data?: Maybe<User>;
  error?: Maybe<Scalars['String']['output']>;
};

export type TodoTaskFragment = { __typename?: 'Todo', task: string } & { ' $fragmentName'?: 'TodoTaskFragment' };

export type AddTodoMutationVariables = Exact<{
  task: Scalars['String']['input'];
  done: Scalars['Boolean']['input'];
}>;


export type AddTodoMutation = { __typename?: 'Mutation', addTodo: { __typename?: 'TodoRes', error?: string | null, data?: { __typename?: 'Todo', done: boolean, id: string, task: string } | null } };

export type DelletTodoMutationVariables = Exact<{
  delletTodoId: Scalars['String']['input'];
}>;


export type DelletTodoMutation = { __typename?: 'Mutation', delletTodo: { __typename?: 'TodoRes', error?: string | null, data?: { __typename?: 'Todo', done: boolean, id: string, task: string } | null } };

export type UpdateTodoMutationVariables = Exact<{
  updateTodoId: Scalars['String']['input'];
  done: Scalars['Boolean']['input'];
  task: Scalars['String']['input'];
}>;


export type UpdateTodoMutation = { __typename?: 'Mutation', updateTodo: { __typename?: 'TodoRes', error?: string | null, data?: { __typename?: 'Todo', done: boolean, id: string, task: string } | null } };

export type SignUpMutationVariables = Exact<{
  password: Scalars['String']['input'];
  email: Scalars['String']['input'];
}>;


export type SignUpMutation = { __typename?: 'Mutation', signUp: { __typename?: 'UserRes', error?: string | null, data?: { __typename?: 'User', email: string, id: string } | null } };

export type LoginMutationVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'UserRes', error?: string | null, data?: { __typename?: 'User', email: string, id: string } | null } };

export type LogoutUserMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutUserMutation = { __typename?: 'Mutation', logoutUser: { __typename?: 'UserRes', error?: string | null, data?: { __typename?: 'User', email: string, id: string } | null } };

export type GetTodosByUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetTodosByUserQuery = { __typename?: 'Query', getTodosByUser: { __typename?: 'TodosRes', error?: string | null, data?: Array<{ __typename?: 'Todo', done: boolean, id: string, task: string }> | null } };

export type GetTodoByIdQueryVariables = Exact<{
  getTodoByIdId: Scalars['String']['input'];
}>;


export type GetTodoByIdQuery = { __typename?: 'Query', getTodoById: { __typename?: 'TodoRes', error?: string | null, data?: (
      { __typename?: 'Todo', id: string, done: boolean }
      & { ' $fragmentRefs'?: { 'TodoTaskFragment': TodoTaskFragment } }
    ) | null } };

export type GetUserByIdQueryVariables = Exact<{
  token: Scalars['String']['input'];
}>;


export type GetUserByIdQuery = { __typename?: 'Query', getUserById: { __typename?: 'UserRes', error?: string | null, data?: { __typename?: 'User', email: string, id: string } | null } };

export class TypedDocumentString<TResult, TVariables>
  extends String
  implements DocumentTypeDecoration<TResult, TVariables>
{
  __apiType?: DocumentTypeDecoration<TResult, TVariables>['__apiType'];

  constructor(private value: string, public __meta__?: Record<string, any> | undefined) {
    super(value);
  }

  toString(): string & DocumentTypeDecoration<TResult, TVariables> {
    return this.value;
  }
}
export const TodoTaskFragmentDoc = new TypedDocumentString(`
    fragment todoTask on Todo {
  task
}
    `, {"fragmentName":"todoTask"}) as unknown as TypedDocumentString<TodoTaskFragment, unknown>;
export const AddTodoDocument = new TypedDocumentString(`
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
    `) as unknown as TypedDocumentString<AddTodoMutation, AddTodoMutationVariables>;
export const DelletTodoDocument = new TypedDocumentString(`
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
    `) as unknown as TypedDocumentString<DelletTodoMutation, DelletTodoMutationVariables>;
export const UpdateTodoDocument = new TypedDocumentString(`
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
    `) as unknown as TypedDocumentString<UpdateTodoMutation, UpdateTodoMutationVariables>;
export const SignUpDocument = new TypedDocumentString(`
    mutation signUp($password: String!, $email: String!) {
  signUp(password: $password, email: $email) {
    error
    data {
      email
      id
    }
  }
}
    `) as unknown as TypedDocumentString<SignUpMutation, SignUpMutationVariables>;
export const LoginDocument = new TypedDocumentString(`
    mutation login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    error
    data {
      email
      id
    }
  }
}
    `) as unknown as TypedDocumentString<LoginMutation, LoginMutationVariables>;
export const LogoutUserDocument = new TypedDocumentString(`
    mutation logoutUser {
  logoutUser {
    error
    data {
      email
      id
    }
  }
}
    `) as unknown as TypedDocumentString<LogoutUserMutation, LogoutUserMutationVariables>;
export const GetTodosByUserDocument = new TypedDocumentString(`
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
    `) as unknown as TypedDocumentString<GetTodosByUserQuery, GetTodosByUserQueryVariables>;
export const GetTodoByIdDocument = new TypedDocumentString(`
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
    fragment todoTask on Todo {
  task
}`) as unknown as TypedDocumentString<GetTodoByIdQuery, GetTodoByIdQueryVariables>;
export const GetUserByIdDocument = new TypedDocumentString(`
    query getUserById($token: String!) {
  getUserById(token: $token) {
    error
    data {
      email
      id
    }
  }
}
    `) as unknown as TypedDocumentString<GetUserByIdQuery, GetUserByIdQueryVariables>;