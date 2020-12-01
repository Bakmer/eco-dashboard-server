import { Resolver, Query } from "type-graphql";

@Resolver()
export class HelloResolver {
  @Query(() => String)
  hello() {
    console.log("hello resolver triggered");
    return "bye";
  }
}
