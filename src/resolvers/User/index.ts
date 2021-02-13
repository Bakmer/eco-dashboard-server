import { MyContext } from "src/types/MyContext";
import { Resolver, Arg, Ctx, Mutation, Query, Authorized } from "type-graphql";
import { getConnection } from "typeorm";
import { COOKIE_NAME } from "../../constants";
import messages from "../../constants/messages";
import {
  UserResponse,
  UsernamePasswordInput,
  CreateUserFields,
  PaginatedUsersResponse,
  ChangeUserStatusFields,
  ChangeStatusResponse,
} from "./types";
import { PaginationFields } from "../sharedTypes";
import { UserInputError } from "apollo-server-express";

import { Users as User } from "../../entities/User";
import { Stores as Store } from "../../entities/Store";
import { Roles as Role } from "../../entities/Role";

const {
  GENERIC_ERROR,
  LOGIN_REGISTER_FAIL,
  REGISTER_SUCCESS,
  STORE_NOT_FOUND_RESPONSE,
  ME_SUCCESS,
  ROLE_NOT_FOUND,
  LOGIN_WITH_USERNAME_PASSWORD,
  USERS_LIST_SUCCESSFUL,
  CHANGE_USER_STATUS_SUCCESS,
} = messages;

@Resolver(User)
export class UserResolver {
  // @FieldResolver(() => String)
  // name(@Root() user: User) {
  //   return `Se ha creado a ${user.name}`;
  // }

  @Mutation(() => UserResponse)
  async createUser(
    @Arg("data") data: CreateUserFields,
    @Ctx() { dataSources: { userService } }: MyContext
  ): Promise<UserResponse> {
    try {
      const store = await Store.findOne({ id: data.storeId });
      if (!store) {
        return new UserInputError(STORE_NOT_FOUND_RESPONSE);
      }

      const role = await Role.findOne({ id: data.roleId });
      if (!role) {
        return new UserInputError(ROLE_NOT_FOUND);
      }

      const newUser = await userService.create(data);

      return {
        data: newUser,
        message: REGISTER_SUCCESS,
      };
    } catch (error) {
      console.log(error);
      return new Error(error.message);
    }
  }

  @Mutation(() => UserResponse)
  async login(
    @Arg("data") { username, password }: UsernamePasswordInput,
    @Ctx() { req, dataSources: { userService } }: MyContext
  ): Promise<UserResponse> {
    try {
      const user = await userService.findByUsername(username);
      if (!user) {
        return new UserInputError(LOGIN_REGISTER_FAIL);
      }

      const validatePassword = user.password === password;
      if (!validatePassword) {
        return new UserInputError(LOGIN_REGISTER_FAIL);
      }

      req.session.user = {
        id: user.id,
        roleId: user.roleId,
        storeId: user.storeId,
      };
      return {
        data: user,
        message: "",
      };
    } catch (error) {
      console.log(error);
      return new Error(GENERIC_ERROR);
    }
  }

  @Query(() => UserResponse)
  async me(
    @Ctx() { req, dataSources: { userService } }: MyContext
  ): Promise<UserResponse> {
    const userSession = req.session.user;

    if (!userSession) {
      return new Error(LOGIN_WITH_USERNAME_PASSWORD);
    }

    try {
      const user = await userService.me();

      return {
        data: user,
        message: ME_SUCCESS,
      };
    } catch (error) {
      return new Error(GENERIC_ERROR);
    }
  }

  @Query(() => PaginatedUsersResponse)
  @Authorized()
  async listUsers(
    @Arg("vars", { nullable: true }) vars: PaginationFields,
    @Ctx() { dataSources: { userService } }: MyContext
  ): Promise<PaginatedUsersResponse> {
    try {
      const list = await userService.list(vars);

      list.message = USERS_LIST_SUCCESSFUL;

      return list;
    } catch (error) {
      console.log(error);
      return new Error(GENERIC_ERROR);
    }
  }

  @Mutation(() => ChangeStatusResponse)
  @Authorized()
  async changeUserStatus(
    @Arg("data") { id }: ChangeUserStatusFields,
    @Ctx() { dataSources: { userService } }: MyContext
  ): Promise<ChangeStatusResponse> {
    try {
      const newStatus = await userService.changeStatus(id);

      return {
        data: { id: newStatus, name: newStatus === 1 ? "Activo" : "Inactivo" },
        message: CHANGE_USER_STATUS_SUCCESS,
      };
    } catch (error) {
      console.log(error);
      return new Error(GENERIC_ERROR);
    }
  }

  @Mutation(() => UserResponse)
  @Authorized()
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
