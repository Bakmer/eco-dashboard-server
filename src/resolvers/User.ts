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
import messages from "../constants/messages";
import { ApiResponse, UsernamePasswordInput } from "./types";

import { Users as User } from "../entities/User";
import { Stores as Store } from "../entities/Store";

const {
  GENERIC_ERROR,
  LOGIN_REGISTER_FAIL,
  REGISTER_SUCCESS,
  STORE_NOT_FOUND_RESPONSE,
  USER_NOT_FOUND,
  ME_SUCCESS,
} = messages;

@Resolver(User)
export class UserResolver {
  @FieldResolver(() => String)
  name(@Root() user: User) {
    return `Se ha creado a ${user.username}`;
  }

  @Mutation(() => ApiResponse)
  async register(
    @Arg("data") data: UsernamePasswordInput
  ): Promise<ApiResponse> {
    try {
      const store = await Store.findOne({ id: data.storeId });
      if (!store) {
        return {
          errors: [
            {
              field: "error",
              message: STORE_NOT_FOUND_RESPONSE,
            },
          ],
        };
      }
    } catch (error) {
      return {
        errors: [
          {
            field: "error",
            message: GENERIC_ERROR,
          },
        ],
      };
    }

    let user;

    try {
      const newUser = await User.create({
        ...data,
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

    return {
      data: user,
      message: REGISTER_SUCCESS,
      errors: null,
    };
  }

  @Mutation(() => ApiResponse)
  async login(
    @Arg("username") username: string,
    @Arg("password") password: string,
    @Ctx() { req }: MyContext
  ): Promise<ApiResponse> {
    const user = await User.findOne({ where: { username: username } });

    if (!user) {
      return {
        errors: [
          {
            field: "error",
            message: LOGIN_REGISTER_FAIL,
          },
        ],
      };
    }

    const validatePassword: boolean = user.password === password;

    if (!validatePassword) {
      return {
        errors: [
          {
            field: "error",
            message: LOGIN_REGISTER_FAIL,
          },
        ],
      };
    }

    req.session.userId = user.id;

    return {
      data: user,
      errors: null,
      message: "",
    };
  }

  @Query(() => ApiResponse)
  async me(@Ctx() { req }: MyContext): Promise<ApiResponse> {
    if (!req.session.userId) {
      return {
        errors: [
          {
            field: "error",
            message: USER_NOT_FOUND,
          },
        ],
      };
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
    return {
      errors: null,
      data: user,
      message: ME_SUCCESS,
    };
  }

  @Mutation(() => String)
  async deleteAllUsers(): Promise<String> {
    await getConnection().createQueryBuilder().delete().from(User).execute();
    return "Se han eliminado todos los usuarios";
  }
}
