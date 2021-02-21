import { DataSource, DataSourceConfig } from "apollo-datasource";
import { User } from "../../entities/User";
import { MyContext } from "../../types/MyContext";
import { capitalize } from "../../utils";
import { UserRepository } from "../../repositories/UserRepository";

import {
  CreateUserFields,
  UpdateUserFields,
  PaginatedUsersResponse,
} from "../../resolvers/User/types";
import { PaginationFields, OrderType } from "../../resolvers/sharedTypes";

export default class UserService extends DataSource {
  ctx: MyContext;

  constructor() {
    super();
  }

  initialize(config: DataSourceConfig<MyContext>) {
    this.ctx = config.context;
  }

  create(data: CreateUserFields): Promise<User> {
    return UserRepository.create({
      ...data,
      username: capitalize(data.username),
      name: capitalize(data.name),
      last_name: capitalize(data.last_name),
    });
  }

  findById(id: number): Promise<User | undefined> {
    return UserRepository.findById(id);
  }

  findByUsername(username: string): Promise<User | undefined> {
    return UserRepository.findByUsername(username);
  }

  me(): Promise<User | undefined> {
    const userSessionId = this.ctx.req.session.user.id;

    return this.findById(userSessionId);
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

    const users = await UserRepository.list(
      search,
      itemsToSkip,
      per_page,
      getOrderBy(),
      order_type
    );

    const count = await UserRepository.count(search);

    return {
      data: users,
      filters: {
        search,
        page,
        per_page,
        count,
        order_type,
        order_by,
      },
    };
  }

  async changeState(id: number): Promise<number> {
    const state = await UserRepository.getState(id);

    const newState = state?.state_id === 1 ? 2 : 1;

    await UserRepository.changeState(id, newState);

    return newState;
  }

  async update(data: UpdateUserFields): Promise<User | undefined> {
    await UserRepository.update(data);

    return await this.findById(data.id);
  }
}
