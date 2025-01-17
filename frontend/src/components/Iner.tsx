"use client";

import { useTodoQ, useTodosUpdate } from "@/hooks/todos";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { Input } from "./ui/input";
import Link from "next/link";

export default function Iner({ id }: { id: string }) {
  const { data: todo } = useTodoQ({ getTodoByIdId: id });

  const [edit, setEdit] = useState(false);
  const [update, setUpdate] = useState({
    task: "",
    done: false,
    id: "",
  });
  const { mutateAsync: updateTodoFn } = useTodosUpdate();

  const handelUpdate = async () => {
    console.log("update", update);

    try {
      await updateTodoFn({
        updateTodoId: `${update.id}`,
        done: update.done,
        task: update.task,
      });
      setEdit(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setUpdate({
      done: todo?.done ?? false,
      task: todo?.task ?? "",
      id: todo?.id ?? "",
    });
  }, [todo]);

  return (
    <div>
      <div className="p-4 mx-4 flex flex-row  justify-between  bg-slate-400 rounded-2xl ">
        <div className="px-4 py-2  content-center">
          {!edit ? (
            <p>{todo?.task}</p>
          ) : (
            <Input
              value={update.task}
              onChange={(e) =>
                setUpdate((prev) => ({ ...prev, task: e.target.value }))
              }
            />
          )}
        </div>
        <div className=" flex flex-row gap-2 ">
          <input
            type="checkbox"
            className="size-8 rounded-2xl self-center bg-slate-500 colur-red-500"
            checked={update.done}
            onChange={() => {
              if (edit) {
                setUpdate({ ...update, done: update.done ? false : true });
              }
            }}
          />

          {!edit && (
            <Button
              className={`ml-4 px-3 py-2 bg-slate-500 text-slate-700 text-lg rounded-2xl ${
                !edit ? `border-2 border-blue-600` : ``
              }`}
              onClick={() => setEdit(!edit)}
            >
              Edit
            </Button>
          )}

          {edit && (
            <Button
              onClick={handelUpdate}
              className={`ml-4 px-3 py-2 bg-slate-500 text-slate-700 text-lg rounded-2xl ${
                !edit ? `border-2 border-blue-600` : ``
              }`}
            >
              done changes
            </Button>
          )}
        </div>
      </div>
      <Link href={"/"} className="bg-blue-500 p-4 rounded-2xl">
        go back to main page
      </Link>
    </div>
  );
}
