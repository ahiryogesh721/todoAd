import Iner from "@/components/Iner";
import React from "react";

export default async function Page({
  params,
}: {
  params: Promise<{ todo: string }>;
}) {
  const id = (await params).todo;

  return <Iner id={id} />;
}
