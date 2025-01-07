"use client";
import Card from "@/components/Card";
import { TodoType, useTodosAdd, useTodosQ } from "@/hooks/todos";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useUserLogout } from "@/hooks/user";

export default function Home() {
  const [add, setAdd] = useState({ task: "", done: false });

  const { data: todos } = useTodosQ();
  const { mutateAsync: addTodoFn } = useTodosAdd();
  const { mutateAsync: logoutUserFn, error: logoutUserError } = useUserLogout();

  const Router = useRouter();

  const handelLogout = async () => {
    try {
      await logoutUserFn();
      if (logoutUserError === null) {
        Router.push("/auth");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handelAdd = () => {
    addTodoFn(add);
    setAdd({ task: "", done: false });
  };

  return (
    <div className="p-2 flex flex-col gap-2">
      <Button
        onClick={handelLogout}
        className="bg-red-500 text-2xl p-6 rounded-3xl"
        variant="outline"
      >
        logout
      </Button>
      <div className="flex flex-col gap-2 items-center">
        <div>
          <Input
            placeholder="taks"
            onChange={(e) =>
              setAdd((prev) => ({ ...prev, task: e.target.value }))
            }
            value={add.task}
          />
          <input
            type="checkbox"
            checked={add.done}
            onChange={() => setAdd((prev) => ({ ...prev, done: !prev.done }))}
          />
          <Button onClick={handelAdd}>add</Button>
        </div>
      </div>
      {/* todos */}
      <div className="flex flex-col gap-2 items-center">
        {todos && todos.length !== 0 && (
          <div className="w-full flex flex-col gap-2 p-2">
            {todos.map((todo: TodoType, i: number) => {
              return (
                <div
                  className="p-2 m-2 rounded-2xl flex flex-col  bg-slate-300 "
                  key={todo.id}
                >
                  <Card todo={todo} i={i} />
                </div>
              );
            })}
          </div>
        )}
        {todos && todos.length === 0 && <p>add your todos</p>}
      </div>
    </div>
  );
}
