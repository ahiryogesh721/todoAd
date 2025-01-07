import { graphqlClient } from "@/utils/graphqlClient";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  AUth_USER,
  CREATE_USER,
  LOGIN_USER,
  LOGOUT_USER,
} from "@/utils/queries";
import { QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient();

export type UserType = {
  email: string;
  id: number;
};

export type useUserReqType = {
  error: string | unknown;
  data: UserType | undefined;
};

export const useUserAuth = () => {
  const { error, data } = useQuery({
    queryKey: ["authUser"],
    queryFn: async () => {
      const res = await graphqlClient.request<{
        getUserById: useUserReqType;
      }>(AUth_USER);
      if (res.getUserById.error !== null) {
        throw new Error(`${res.getUserById.error}`);
      }
      return res.getUserById.data;
    },
  });

  return { error, data };
};

export const useUserLogout = () => {
  const { mutateAsync, error } = useMutation({
    mutationKey: ["userLogout"],
    mutationFn: async () => {
      const res = await graphqlClient.request<{ logoutUser: useUserReqType }>(
        LOGOUT_USER
      );
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
    mutationFn: async ({
      email,
      password,
    }: {
      email: string;
      password: string;
    }) => {
      const res = await graphqlClient.request<{ login: useUserReqType }>(
        LOGIN_USER,
        {
          email,
          password,
        }
      );
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
    mutationFn: async ({
      email,
      password,
      cPassword,
    }: {
      email: string;
      password: string;
      cPassword: string;
    }) => {
      if (password !== cPassword) {
        throw new Error("password does not match");
      }
      const res = await graphqlClient.request<{ signUp: useUserReqType }>(
        CREATE_USER,
        {
          email,
          password,
        }
      );
      if (res.signUp.error !== null) {
        throw new Error(`${res.signUp.error}`);
      }
      return res.signUp.data;
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
