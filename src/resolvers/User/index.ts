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
  UpdateUserFields,
  DeleteUserFields,
} from "./types";
import { PaginationFields, ChangeStateFields, ApiResponse } from "../sharedTypes";
import { handleError } from "../../utils";

import { User } from "../../entities/User";

const {
  GENERIC_ERROR,
  REGISTER_SUCCESS,
  ME_SUCCESS,
  USERS_LIST_SUCCESSFUL,
  CHANGE_USER_STATE_SUCCESS,
  UPDATE_USER_SUCCESS,
  DELETE_USER_SUCCESS,
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
    @Ctx()
    { dataSources: { userService } }: MyContext
  ): Promise<UserResponse> {
    try {
      const newUser = await userService.create(data);

      return {
        data: newUser,
        message: REGISTER_SUCCESS,
      };
    } catch (error) {
      console.log(error);
      return handleError(error);
    }
  }

  @Mutation(() => UserResponse)
  async login(
    @Arg("data") { username, password }: UsernamePasswordInput,
    @Ctx() { dataSources: { userService } }: MyContext
  ): Promise<UserResponse> {
    try {
      const user = await userService.login(username, password);

      return {
        data: user,
        message: "",
      };
    } catch (error) {
      console.log(error);
      return handleError(error);
    }
  }

  @Query(() => UserResponse)
  async me(@Ctx() { dataSources: { userService } }: MyContext): Promise<UserResponse> {
    try {
      const user = await userService.me();

      return {
        data: user,
        message: ME_SUCCESS,
      };
    } catch (error) {
      console.log(error);
      return handleError(error);
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

      return {
        data: list.data,
        filters: list.filters,
        message: USERS_LIST_SUCCESSFUL,
      };
    } catch (error) {
      console.log(error);
      return handleError(error);
    }
  }

  @Mutation(() => UserResponse)
  @Authorized()
  async changeUserState(
    @Arg("data") { id }: ChangeStateFields,
    @Ctx() { dataSources: { userService } }: MyContext
  ): Promise<UserResponse> {
    try {
      const updatedUser = await userService.changeState(id);

      return {
        data: updatedUser,
        message: CHANGE_USER_STATE_SUCCESS,
      };
    } catch (error) {
      console.log(error);
      return handleError(error);
    }
  }

  @Mutation(() => UserResponse)
  @Authorized()
  async updateUser(
    @Arg("data") data: UpdateUserFields,
    @Ctx()
    { dataSources: { userService } }: MyContext
  ): Promise<UserResponse> {
    try {
      const updatedUser = await userService.update(data);

      return {
        data: updatedUser,
        message: UPDATE_USER_SUCCESS,
      };
    } catch (error) {
      console.log(error);
      return handleError(error);
    }
  }

  @Mutation(() => ApiResponse)
  @Authorized()
  async deleteUser(
    @Arg("data") { id }: DeleteUserFields,
    @Ctx()
    { dataSources: { userService } }: MyContext
  ): Promise<ApiResponse> {
    try {
      await userService.delete(id);

      return {
        data: { id },
        message: DELETE_USER_SUCCESS,
      };
    } catch (error) {
      return handleError(error);
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
