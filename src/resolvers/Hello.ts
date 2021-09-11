import { Resolver, Query, Authorized } from "type-graphql";
import { ADMIN } from "../constants/roles";

@Resolver()
export class HelloResolver {
  @Authorized(ADMIN)
  @Query(() => String)
  hello() {
    console.log("hello resolver triggered");
    return "bye";
  }
}
