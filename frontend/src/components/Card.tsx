import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { TodoType, useTodosDellet } from "@/hooks/todos";

type CardProps = {
  todo: TodoType;
  i: number;
};

export default function Card({ todo, i }: CardProps) {
  const { mutateAsync: delletTodoFn } = useTodosDellet();

  const router = useRouter();

  const handelDellet = async () => {
    try {
      delletTodoFn({ id: `${todo.id}` });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="p-4 mx-4 flex flex-row  justify-between  bg-slate-400 rounded-2xl ">
        <p className="px-5 py-2 bg-slate-300 text-slate-500 content-center rounded-full">
          {++i}
        </p>
        <div className="px-4 py-2  content-center">
          <p>{todo.task}</p>
        </div>
        <div className=" flex flex-row gap-2 ">
          <Button
            className={`ml-4 px-3 py-2 bg-slate-500 text-slate-700 text-lg rounded-2xl `}
            onClick={() => {
              router.push(`/${todo.id}`);
            }}
          >
            open
          </Button>
          <Button
            className={`ml-4 px-3 py-2 bg-slate-500 text-slate-700 text-lg rounded-2xl `}
            onClick={handelDellet}
          >
            dellet
          </Button>
        </div>
      </div>
    </div>
  );
}
