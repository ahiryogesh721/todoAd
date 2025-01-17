import { Field, ID, ObjectType } from "type-graphql";
import { User } from "./User";

@ObjectType()
export class Todo {
  @Field(() => ID)
  id: string;
  @Field()
  createdAt: string;
  @Field()
  task: string;
  @Field()
  done: boolean;
  @Field(() => User)
  user: User;
}

@ObjectType()
export class TodoRes {
  @Field({ nullable: true })
  error: string | null;

  @Field(() => Todo, { nullable: true })
  data: Todo | null;
}

@ObjectType()
export class TodosRes {
  @Field({ nullable: true })
  error: string | null;

  @Field(() => [Todo], { nullable: true })
  data: Todo[] | null;
}
