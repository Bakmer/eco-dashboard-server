import { MyContext } from "src/types/MyContext";
import {
  InputType,
  Field,
  ObjectType,
  Resolver,
  Arg,
  Ctx,
  Mutation,
  FieldResolver,
  Root,
} from "type-graphql";
import { getConnection } from "typeorm";
import { User } from "../entities/User";

@InputType()
export class UsernamePasswordInput {
  @Field()
  username: string;
  @Field()
  password: string;
}

@ObjectType()
class FieldError {
  @Field()
  field: string;
  @Field()
  message: string;
}

@ObjectType()
class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => User, { nullable: true })
  user?: User;
}

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
    console.log(req.session);
    console.log("sdfdsfsfdsf");

    return { user };
  }

  @Mutation(() => String)
  async deleteAllUsers(): Promise<String> {
    await getConnection().createQueryBuilder().delete().from(User).execute();
    return "Se han eliminado todos los usuarios";
  }
}
