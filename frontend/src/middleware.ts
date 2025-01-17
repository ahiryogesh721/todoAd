import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { graphqlClient } from "./utils/graphqlClient";
import { getSdk } from "./generated/graphql-request-sdk";

const sdk = getSdk(graphqlClient);

export async function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const token = req.cookies.get("token");

  if (!token) {
    url.pathname = "/auth";
    return NextResponse.redirect(url);
  }

  try {
    const res = await sdk.getUserById({ token: token?.value });

    let valid = false;
    if (res.getUserById.error === null) {
      valid = true;
    }

    if (!valid) {
      url.pathname = "/auth";
      return NextResponse.redirect(url);
    }
  } catch (error) {
    console.error("Error validating token:", error);
    url.pathname = "/auth";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/"],
};
