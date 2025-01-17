import { graphqlClient } from "@/utils/graphqlClient";
import { useMutation } from "@tanstack/react-query";
import { QueryClient } from "@tanstack/react-query";
import {
  getSdk,
  LoginMutationVariables,
} from "@/generated/graphql-request-sdk";
import { SignUpMutationVariables } from "@/generated/graphql";

const queryClient = new QueryClient();
const sdk = getSdk(graphqlClient);

export const useUserLogout = () => {
  const { mutateAsync, error } = useMutation({
    mutationKey: ["userLogout"],
    mutationFn: async () => {
      const res = await sdk.logoutUser();
      if (res.logoutUser.error !== null) {
        throw new Error(`${res.logoutUser.error}`);
      }
      return res.logoutUser.data;
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      console.log("mutate succ");
    },
  });

  return {
    mutateAsync,
    error,
  };
};
export const useUserLogin = () => {
  const { mutateAsync, error } = useMutation({
    mutationKey: ["loginUser"],
    mutationFn: async ({ email, password }: LoginMutationVariables) => {
      const res = await sdk.login({ email, password });
      if (res.login.error !== null) {
        throw new Error(`${res.login.error}`);
      }
      return res.login.data;
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      console.log("mutate succ");
    },
  });

  return {
    mutateAsync,
    error,
  };
};

export const useUserCreat = () => {
  const { mutateAsync, error } = useMutation({
    mutationKey: ["creatUser"],
    mutationFn: async ({ email, password }: SignUpMutationVariables) => {
      const res = await sdk.signUp({ email, password });
      if (res.signUp.error !== null) {
        throw new Error(`${res.signUp.error}`);
      }
      return res.signUp.data;
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      console.log("mutate succ");
    },
    onError: async (error) => {
      console.log(error);
    },
  });

  return {
    mutateAsync,
    error,
  };
};
