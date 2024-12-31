import { GraphQLClient } from "graphql-request";

let token;
token = sessionStorage.getItem("user");
if (token) {
  token = JSON.parse(token);
  token = token.token;
}

export const graphqlClient = new GraphQLClient("http://localhost:3500/DB", {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
