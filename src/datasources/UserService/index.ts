import { DataSource, DataSourceConfig } from "apollo-datasource";
import { User } from "../../entities/User";
import { MyContext } from "../../types/MyContext";
import { capitalize } from "../../utils";
import { UserRepository, StoreRepository, RoleRepository } from "../../repositories";
import messages from "../../constants/messages";

import { CreateUserFields, UpdateUserFields, PaginatedUsersResponse } from "../../resolvers/User/types";
import { PaginationFields, OrderType } from "../../resolvers/sharedTypes";

const {
  LOGIN_WITH_USERNAME_PASSWORD,
  LOGIN_REGISTER_FAIL,
  STORE_NOT_FOUND_RESPONSE,
  ROLE_NOT_FOUND,
  USER_ALREADY_EXISTS,
  USER_NOT_FOUND,
  DELETE_USER_ERROR,
} = messages;

export default class UserService extends DataSource {
  ctx: MyContext;

  constructor() {
    super();
  }

  initialize(config: DataSourceConfig<MyContext>) {
    this.ctx = config.context;
  }

  async create(data: CreateUserFields): Promise<User> {
    const validations = await Promise.all([
      UserRepository.findByUsername(data.username),
      StoreRepository.findById(data.store_id),
      RoleRepository.findById(data.role_id),
    ]);

    if (validations[0]) {
      throw { Err: USER_ALREADY_EXISTS };
    }

    if (!validations[1]) {
      throw { InputErr: STORE_NOT_FOUND_RESPONSE };
    }

    if (!validations[2]) {
      throw { InputErr: ROLE_NOT_FOUND };
    }

    return UserRepository.create({
      ...data,
      username: capitalize(data.username),
      name: capitalize(data.name),
      last_name: capitalize(data.last_name),
    });
  }

  async login(username: string, password: string): Promise<User> {
    const user = await UserRepository.findByUsername(username);
    if (!user) {
      throw { Err: LOGIN_REGISTER_FAIL };
    }

    const validatePassword = !!(user.password === password);
    if (!validatePassword) {
      throw { Err: LOGIN_REGISTER_FAIL };
    }

    this.ctx.req.session.user = {
      id: user.id,
      role_id: user.role_id,
      store_id: user.store_id,
    };

    return user;
  }

  me(): Promise<User | undefined> {
    const userSession = this.ctx.req.session.user;

    if (!userSession) {
      throw { Err: LOGIN_WITH_USERNAME_PASSWORD };
    }

    return UserRepository.findById(userSession.id);
  }

  async list(vars: PaginationFields): Promise<PaginatedUsersResponse> {
    const getOrderBy = () => {
      const order_by = vars?.order_by;
      if (!order_by) {
        return "user.id";
      }
      if (order_by === "store" || order_by === "role" || order_by === "state") {
        return `${order_by}.id`;
      } else {
        return `user.${order_by}`;
      }
    };
    const search = vars?.search ? vars.search : "";
    const page = vars?.page ? vars.page : 0;
    const order_type: OrderType = vars?.order_type ? vars.order_type : "DESC";
    const order_by = vars.order_by ? vars.order_by : "id";
    const per_page = vars?.per_page ? vars.per_page : 30;
    const itemsToSkip = vars?.per_page ? vars.per_page * page : 0;

    const listData = await Promise.all([
      UserRepository.list(search, itemsToSkip, per_page, getOrderBy(), order_type),
      UserRepository.count(search),
    ]);

    return {
      data: listData[0],
      filters: {
        search,
        page,
        per_page,
        count: listData[1],
        order_type,
        order_by,
      },
    };
  }

  async changeState(id: number): Promise<number> {
    const user = await UserRepository.findById(id);
    if (!user) {
      throw { Err: USER_NOT_FOUND };
    }

    const newState = user.state_id === 1 ? 2 : 1;

    await UserRepository.changeState(id, newState);

    return newState;
  }

  async update(data: UpdateUserFields): Promise<User | undefined> {
    const validations = await Promise.all([
      UserRepository.findByUsername(data.user.username),
      StoreRepository.findById(data.user.store_id),
      RoleRepository.findById(data.user.role_id),
    ]);

    if (validations[0] && validations[0].id !== data.id) {
      throw { Err: USER_ALREADY_EXISTS };
    }

    if (!validations[1]) {
      throw { InputErr: STORE_NOT_FOUND_RESPONSE };
    }

    if (!validations[2]) {
      throw { InputErr: ROLE_NOT_FOUND };
    }

    await UserRepository.update(data);

    return UserRepository.findById(data.id);
  }

  async delete(id: number): Promise<void> {
    const user = await UserRepository.findById(id);
    if (!user) {
      throw { InputErr: DELETE_USER_ERROR };
    }

    await UserRepository.softDelete(id, user.username);
  }
}
