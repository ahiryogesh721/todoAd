import { useMutation, useQuery } from "@tanstack/react-query";
import { graphqlClient } from "@/utils/graphqlClient";
import { queryClient } from "@/provider";
import {
  AddTodoMutationVariables,
  DelletTodoMutationVariables,
  getSdk,
  GetTodoByIdQueryVariables,
  UpdateTodoMutationVariables,
} from "@/generated/graphql-request-sdk";

const sdk = getSdk(graphqlClient);

export const useTodosQ = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["getTodosByUser"],
    queryFn: async () => {
      const res = await sdk.getTodosByUser();
      if (res.getTodosByUser.error !== null) {
        throw new Error(`${res.getTodosByUser.error}`);
      }
      return res.getTodosByUser.data;
    },
  });

  return { data, isLoading, error };
};

export const useTodoQ = ({ getTodoByIdId }: GetTodoByIdQueryVariables) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["getTodoById"],
    queryFn: async () => {
      const res = await sdk.getTodoById({ getTodoByIdId });

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
    mutationFn: async ({ delletTodoId }: DelletTodoMutationVariables) => {
      const res = await sdk.delletTodo({ delletTodoId });
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
        queryKey: ["getTodoById"],
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
      updateTodoId,
    }: UpdateTodoMutationVariables) => {
      const res = await sdk.updateTodo({ done, task, updateTodoId });
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
        queryKey: ["getTodoById"],
      });
    },
  });

  return { mutateAsync, error };
};

export const useTodosAdd = () => {
  const { mutateAsync, error } = useMutation({
    mutationKey: ["addTodo"],
    mutationFn: async ({ task, done }: AddTodoMutationVariables) => {
      const res = await sdk.addTodo({ task, done });
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
        queryKey: ["getTodoById"],
      });
    },
  });

  return { mutateAsync, error };
};
