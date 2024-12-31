"use client";

import { useEffect } from "react";
import Heder from "./../components/Heder";
import { useQuery, useMutation } from "@tanstack/react-query";
import { graphqlClient } from "./../utils/graphqlClient";
import { GET_USER } from "@/utils/queries";

export default function Home() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["getUser"],
    queryFn: async () => {
      return graphqlClient.request(GET_USER, {
        email: "ay721@gmail.com",
        password: "721",
      });
    },
  });

  console.log("error:", error);
  console.log("isLoading:", isLoading);
  console.log("data:", data);

  return (
    <div className="p-2">
      <Heder />
    </div>
  );
}
