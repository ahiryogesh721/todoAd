import { Button } from "./ui/button";

export default function Heder() {
  return (
    <div className="flex flex-row justify-evenly">
      <div>
        <p className="text-4xl font-semibold">todos</p>
      </div>
      <div className="flex flex-row gap-2">
        <Button
          className="bg-blue-500 text-2xl p-6 rounded-3xl"
          variant="outline"
        >
          +
        </Button>
        <div>
          <Button
            className="bg-blue-500 text-2xl p-6 rounded-3xl"
            variant="outline"
          >
            user
          </Button>
        </div>
      </div>
    </div>
  );
}
