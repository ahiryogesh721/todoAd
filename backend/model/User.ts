import { Field, ID, ObjectType } from "type-graphql";
import { Todo } from "./Todo";

@ObjectType()
export class User {
  @Field(() => ID)
  id: string;

  @Field()
  createdAt: string;

  @Field()
  email: string;

  @Field()
  password: string;

  @Field(() => [Todo])
  todos: Todo[];
}

@ObjectType()
export class UserRes {
  @Field({ nullable: true })
  error: string | null;

  @Field(() => User, { nullable: true })
  data: User | null;
}
