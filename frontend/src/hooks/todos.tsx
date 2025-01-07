import { useMutation, useQuery } from "@tanstack/react-query";
import { graphqlClient } from "@/utils/graphqlClient";
import {
  ADD_TODO,
  DELLET_TODO,
  GET_ALL_TODOS,
  GET_TODO_BYID,
  UPDATE_TODO,
} from "@/utils/queries";
import { queryClient } from "@/provider";

export type TodoType = {
  done: boolean;
  id: number | null;
  task: string;
};

export type TodoResType = {
  error: string | unknown;
  data: TodoType | undefined;
};

export type TodosResType = {
  error: string | unknown;
  data: TodoType[] | undefined;
};

export type UseTodoMutateFnType = {
  error: string | unknown;
  data: TodoType;
};

export const useTodosQ = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["getTodosByUser"],
    queryFn: async () => {
      const res = await graphqlClient.request<{ getTodosByUser: TodosResType }>(
        GET_ALL_TODOS
      );
      if (res.getTodosByUser.error !== null) {
        throw new Error(`${res.getTodosByUser.error}`);
      }
      return res.getTodosByUser.data;
    },
  });

  return { data, isLoading, error };
};

export const useTodoQ = ({ id }: { id: string }) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["getTodoByUser"],
    queryFn: async () => {
      const res = await graphqlClient.request<{ getTodoById: TodoResType }>(
        GET_TODO_BYID,
        {
          getTodoByIdId: parseInt(id),
        }
      );

      if (res.getTodoById.error !== null) {
        throw new Error(`${res.getTodoById.error}`);
      }

      return res.getTodoById.data;
    },
  });

  return { data, isLoading, error };
};

export const useTodosDellet = () => {
  const { mutateAsync, error } = useMutation({
    mutationKey: ["delletTodo"],
    mutationFn: async ({ id }: { id: string }) => {
      const res = await graphqlClient.request<{
        delletTodo: UseTodoMutateFnType;
      }>(DELLET_TODO, {
        delletTodoId: id,
      });
      if (res.delletTodo.error !== null) {
        throw new Error(`${res.delletTodo.error}`);
      }
      return res.delletTodo.data;
    },
    onSuccess: async () => {
      console.log("mutate succ");

      queryClient.invalidateQueries({
        queryKey: ["getTodosByUser"],
      });
      queryClient.invalidateQueries({
        queryKey: ["getTodoByUser"],
      });
    },
  });

  return { mutateAsync, error };
};

export const useTodosUpdate = () => {
  const { mutateAsync, error } = useMutation({
    mutationKey: ["updateTodo"],
    mutationFn: async ({
      done,
      task,
      id,
    }: {
      done: boolean;
      task: string;
      id: string;
    }) => {
      const res = await graphqlClient.request<{
        updateTodo: UseTodoMutateFnType;
      }>(UPDATE_TODO, {
        updateTodoId: id,
        done,
        task,
      });
      if (res.updateTodo.error !== null) {
        throw new Error(`${res.updateTodo.error}`);
      }
      return res.updateTodo.data;
    },
    onSuccess: async () => {
      console.log("mutate succ");

      queryClient.invalidateQueries({
        queryKey: ["getTodosByUser"],
      });
      queryClient.invalidateQueries({
        queryKey: ["getTodoByUser"],
      });
    },
  });

  return { mutateAsync, error };
};

export const useTodosAdd = () => {
  const { mutateAsync, error } = useMutation({
    mutationKey: ["addTodo"],
    mutationFn: async ({ task, done }: { task: string; done: boolean }) => {
      const res = await graphqlClient.request<{ addTodo: UseTodoMutateFnType }>(
        ADD_TODO,
        {
          task,
          done,
        }
      );
      if (res.addTodo.error !== null) {
        throw new Error(`${res.addTodo.error}`);
      }
      return res.addTodo.data;
    },
    onSuccess: async () => {
      console.log("mutate succ");

      queryClient.invalidateQueries({
        queryKey: ["getTodosByUser"],
      });
      queryClient.invalidateQueries({
        queryKey: ["getTodoByUser"],
      });
    },
  });

  return { mutateAsync, error };
};
