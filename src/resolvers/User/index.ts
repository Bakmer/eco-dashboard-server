import { MyContext } from "src/types/MyContext";
import { Resolver, Arg, Ctx, Mutation, Query, Authorized } from "type-graphql";
import { getConnection } from "typeorm";
import { COOKIE_NAME } from "../../constants";
import messages from "../../constants/messages";
import {
  UserResponse,
  UsernamePasswordInput,
  RegisterFields,
  PaginatedUsersResponse,
  UsersPaginationFields,
} from "./types";
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
} = messages;

@Resolver(User)
export class UserResolver {
  // @FieldResolver(() => String)
  // name(@Root() user: User) {
  //   return `Se ha creado a ${user.name}`;
  // }

  @Mutation(() => UserResponse)
  async register(@Arg("data") data: RegisterFields): Promise<UserResponse> {
    try {
      const store = await Store.findOne({ id: data.storeId });
      if (!store) {
        return new UserInputError(STORE_NOT_FOUND_RESPONSE);
      }
    } catch (error) {
      console.log(error);
      return new Error(GENERIC_ERROR);
    }

    try {
      const role = await Role.findOne({ id: data.roleId });
      if (!role) {
        return new UserInputError(ROLE_NOT_FOUND);
      }
    } catch (error) {
      console.log(error);
      return new Error(GENERIC_ERROR);
    }

    let user;

    try {
      const newUser = await User.create({ ...data, statusId: 1 }).save();
      user = newUser;
    } catch (error) {
      console.log(error);
      return new Error(error.message);
    }

    return {
      data: user,
      message: REGISTER_SUCCESS,
    };
  }

  @Mutation(() => UserResponse)
  async login(
    @Arg("data") { username, password }: UsernamePasswordInput,
    @Ctx() { req }: MyContext
  ): Promise<UserResponse> {
    try {
      const user = await User.findOne({ where: { username: username } });
      if (!user) {
        return new UserInputError(LOGIN_REGISTER_FAIL);
      }

      const validatePassword = user.password === password;
      if (!validatePassword) {
        return new UserInputError(LOGIN_REGISTER_FAIL);
      }

      const meData = await getConnection()
        .createQueryBuilder()
        .select("user")
        .from(User, "user")
        .where("user.id = :id", { id: user.id })
        .leftJoinAndSelect("user.store", "store")
        .leftJoinAndSelect("user.role", "role")
        .leftJoinAndSelect("user.status", "status")
        .getOne();

      req.session.user = {
        id: user.id,
        roleId: user.roleId,
        storeId: user.storeId,
      };
      return {
        data: meData,
        message: "",
      };
    } catch (error) {
      console.log(error);
      return new Error(GENERIC_ERROR);
    }
  }

  @Query(() => UserResponse)
  async me(@Ctx() { req }: MyContext): Promise<UserResponse> {
    const userSession = req.session.user;

    if (!userSession) {
      return new Error(LOGIN_WITH_USERNAME_PASSWORD);
    }

    try {
      const user = await getConnection()
        .createQueryBuilder()
        .select("user")
        .from(User, "user")
        .where("user.id = :id", { id: userSession.id })
        .leftJoinAndSelect("user.store", "store")
        .leftJoinAndSelect("user.role", "role")
        .leftJoinAndSelect("user.status", "status")
        .getOne();

      // I can also do it without query builder
      // const user = await User.findOne({ id: req.session.user });
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
    @Arg("vars", { nullable: true }) vars: UsersPaginationFields
  ): Promise<PaginatedUsersResponse> {
    const getOrderBy = () => {
      const field = vars?.field;
      if (!field) {
        return "user.id";
      }
      if (field === "store" || field === "role" || field === "status") {
        return `user.${field}.id`;
      } else {
        return `user.${field}`;
      }
    };
    const search = vars?.search ? vars.search : "";
    const page = vars?.page ? vars.page : 1;
    const itemsToSkip = vars?.per_page ? vars.per_page * (page - 1) : 0;
    const orderType = vars?.order_type ? vars.order_type : "ASC";
    const perPage = vars?.per_page ? vars.per_page : 3;

    try {
      const users = await getConnection()
        .createQueryBuilder()
        .select("user")
        .from(User, "user")
        .where("user.username like :username", { username: `%${search}%` })
        .orWhere("user.name like :name", { name: `%${search}%` })
        .orWhere("user.last_name like :last_name", {
          last_name: `%${search}%`,
        })
        .orWhere("user.id = :id", { id: search })
        .leftJoinAndSelect("user.store", "store")
        .leftJoinAndSelect("user.role", "role")
        .leftJoinAndSelect("user.status", "status")
        .skip(itemsToSkip)
        .take(perPage)
        .orderBy(getOrderBy(), orderType)
        .getMany();

      const count = await getConnection()
        .createQueryBuilder()
        .select("user")
        .from(User, "user")
        .where("user.username like :username", { username: `%${search}%` })
        .orWhere("user.name like :name", { name: `%${search}%` })
        .orWhere("user.last_name like :last_name", {
          last_name: `%${search}%`,
        })
        .orWhere("user.id = :id", { id: search })
        .getCount();

      return {
        data: users,
        message: USERS_LIST_SUCCESSFUL,
        page: page,
        per_page: perPage,
        count: count,
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
