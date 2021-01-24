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
import { COOKIE_NAME } from "../../constants";
import messages from "../../constants/messages";
import { UsernamePasswordInput, RegisterFields } from "./types";
import { ApiResponse } from "../sharedTypes";
import argon2 from "argon2";

import { Users as User } from "../../entities/User";
import { Stores as Store } from "../../entities/Store";

const {
  GENERIC_ERROR,
  LOGIN_REGISTER_FAIL,
  REGISTER_SUCCESS,
  STORE_NOT_FOUND_RESPONSE,
  NOT_AUTHENTICATED,
  ME_SUCCESS,
} = messages;

@Resolver(User)
export class UserResolver {
  @FieldResolver(() => String)
  name(@Root() user: User) {
    return `Se ha creado a ${user.username}`;
  }

  @Mutation(() => ApiResponse)
  async register(@Arg("data") data: RegisterFields): Promise<ApiResponse> {
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
    const hashedPassword = await argon2.hash(data.password);

    try {
      const newUser = await User.create({
        ...data,
        password: hashedPassword,
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
    };
  }

  @Mutation(() => ApiResponse)
  async login(
    @Arg("data") { username, password }: UsernamePasswordInput,
    @Ctx() { req }: MyContext
  ): Promise<ApiResponse> {
    try {
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

      const validatePassword = await argon2.verify(user.password, password);
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
        message: "",
      };
    } catch (error) {
      console.log(error);
      return {
        errors: [
          {
            field: "error",
            message: GENERIC_ERROR,
          },
        ],
      };
    }
  }

  @Query(() => ApiResponse)
  async me(@Ctx() { req }: MyContext): Promise<ApiResponse> {
    if (!req.session.userId) {
      return {
        errors: [
          {
            field: "error",
            message: NOT_AUTHENTICATED,
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
      data: user,
      message: ME_SUCCESS,
    };
  }

  @Mutation(() => ApiResponse)
  logout(@Ctx() { req, res }: MyContext) {
    return new Promise((resolve) =>
      req.session?.destroy((err) => {
        res.clearCookie(COOKIE_NAME);
        if (err) {
          console.log(err);
          resolve(false);
          return [{ field: "error", message: GENERIC_ERROR }];
        }

        return resolve(true);
      })
    );
  }

  @Mutation(() => String)
  async deleteAllUsers(): Promise<String> {
    await getConnection().createQueryBuilder().delete().from(User).execute();
    return "Se han eliminado todos los usuarios";
  }
}
