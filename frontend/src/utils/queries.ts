import { gql } from "graphql-request";

export const CREATE_USER = gql`
  mutation ($email: String!, $password: String!) {
    signUp(email: $email, password: $password) {
      error
      data {
        email
        id
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation ($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      error
      data {
        email
        id
      }
    }
  }
`;

export const AUth_USER = gql`
  query ($token: String!) {
    getUserById(token: $token) {
      error
      data {
        email
        id
      }
    }
  }
`;

export const LOGOUT_USER = gql`
  mutation {
    logoutUser {
      error
      data {
        email
        id
      }
    }
  }
`;

export const GET_ALL_TODOS = gql`
  query {
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

export const GET_TODO_BYID = gql`
  query ($getTodoByIdId: Int!) {
    getTodoById(id: $getTodoByIdId) {
      error
      data {
        done
        id
        task
      }
    }
  }
`;

export const ADD_TODO = gql`
  mutation ($task: String!, $done: Boolean!) {
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

export const DELLET_TODO = gql`
  mutation ($delletTodoId: Int!) {
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

export const UPDATE_TODO = gql`
  mutation ($updateTodoId: String!, $done: Boolean!, $task: String!) {
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
