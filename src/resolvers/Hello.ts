import { Resolver, Query, Authorized } from "type-graphql";

@Resolver()
export class HelloResolver {
  @Authorized("asdfasdf")
  @Query(() => String)
  hello() {
    console.log("hello resolver triggered");
    return "bye";
  }
}
