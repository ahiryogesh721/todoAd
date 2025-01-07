"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useUserLogin } from "@/hooks/user";
import { useFormik } from "formik";
import { useState } from "react";
import { useRouter } from "next/navigation";

type InitialValuesType = {
  email: string;
  password: string;
};

export default function Login() {
  const [allow, setAllow] = useState(true);

  const Router = useRouter();

  const { mutateAsync: loginUserFn } = useUserLogin();

  const validate = (values: InitialValuesType) => {
    const errors: {
      email?: string;
      password?: string;
    } = {};

    if (!values.email) {
      errors.email = "email is Required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = "Invalid email address";
    }

    if (!values.password) {
      errors.password = "password is Required";
    }
    if (errors.email === undefined && errors.password === undefined) {
      setAllow(false);
    } else {
      setAllow(true);
    }
    return errors;
  };

  const initialValues = {
    email: "",
    password: "",
  };

  const handleSubmit = async (values: { email: string; password: string }) => {
    try {
      await loginUserFn({
        email: values.email,
        password: values.password,
      });
      formik.resetForm();

      Router.push("/");
    } catch (error) {
      if (error instanceof Error) {
        formik.errors.password = error.message;
      }
    }
  };

  const formik = useFormik({
    initialValues,
    validate,
    onSubmit: handleSubmit,
  });

  return (
    <form onSubmit={formik.handleSubmit} className="flex flex-col gap-2">
      <Input
        id="email"
        name="email"
        type="email"
        placeholder="email"
        onChange={formik.handleChange}
        value={formik.values.email}
      />
      {formik.errors.email ? (
        <p className="text-red-600">{formik.errors.email}</p>
      ) : null}
      <Input
        id="password"
        name="password"
        type="password"
        placeholder="password"
        onChange={formik.handleChange}
        value={formik.values.password}
      />
      {formik.errors.password ? (
        <p className="text-red-600">{formik.errors.password}</p>
      ) : null}
      <Button disabled={allow} className="disabled:bg-slate-500" type="submit">
        Submit
      </Button>
    </form>
  );
}
