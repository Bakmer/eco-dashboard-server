import { MyContext } from "src/types/MyContext";
import {
  Resolver,
  Arg,
  Ctx,
  Mutation,
  FieldResolver,
  Root,
  Query,
} from "type-graphql";
import { getConnection } from "typeorm";
import { storeNotFoundResponse } from "../constants";
import { UserResponse, UsernamePasswordInput } from "./types";

import { Users as User } from "../entities/User";
import { Stores as Store } from "../entities/Store";

@Resolver(User)
export class UserResolver {
  @FieldResolver(() => String)
  name(@Root() user: User) {
    return `Se ha creado a ${user.username}`;
  }

  @Mutation(() => UserResponse)
  async register(
    @Arg("options") options: UsernamePasswordInput,
    @Ctx() { req }: MyContext
  ): Promise<UserResponse> {
    try {
      const store = await Store.findOne({ id: options.storeId });
      if (!store) {
        return {
          errors: [storeNotFoundResponse],
        };
      }
    } catch (error) {
      return {
        errors: [storeNotFoundResponse],
      };
    }

    let user;
    try {
      const newUser = await User.create({
        ...options,
      }).save();
      user = newUser;
    } catch (error) {
      return {
        errors: [
          {
            field: "error",
            message: error.message,
          },
        ],
      };
    }

    req.session!.userId = user.id;

    return { user };
  }

  @Query(() => User, { nullable: true })
  async me(@Ctx() { req }: MyContext): Promise<User | null> {
    if (!req.session.userId) {
      return null;
    }

    let user = await getConnection()
      .createQueryBuilder()
      .select("user")
      .from(User, "user")
      .where("user.id = :id", { id: req.session.userId })
      .leftJoinAndSelect("user.store", "store")
      .getOne();

    // I can also do it without query builder
    // const user = await User.findOne({ id: req.session.userId });
    return user!;
  }

  @Mutation(() => String)
  async deleteAllUsers(): Promise<String> {
    await getConnection().createQueryBuilder().delete().from(User).execute();
    return "Se han eliminado todos los usuarios";
  }
}
