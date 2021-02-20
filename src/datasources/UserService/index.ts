import { DataSource, DataSourceConfig } from "apollo-datasource";
import { getConnection } from "typeorm";
import { User } from "../../entities/User";
import { MyContext } from "../../types/MyContext";

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

  async create(data: CreateUserFields): Promise<User> {
    return await User.create(data).save();
  }

  async findById(id: number): Promise<User | undefined> {
    return await getConnection()
      .createQueryBuilder()
      .select("user")
      .from(User, "user")
      .where("user.id = :id", { id })
      .leftJoinAndSelect("user.store", "store")
      .leftJoinAndSelect("user.role", "role")
      .leftJoinAndSelect("user.state", "state")
      .getOne();
    // I can also do it without query builder
    // const user = await User.findOne({ id: req.session.user });
  }

  async findByUsername(username: string): Promise<User | undefined> {
    return await getConnection()
      .createQueryBuilder()
      .select("user")
      .from(User, "user")
      .where("user.username = :username", { username })
      .leftJoinAndSelect("user.store", "store")
      .leftJoinAndSelect("user.role", "role")
      .leftJoinAndSelect("user.state", "state")
      .getOne();
  }

  async me(): Promise<User | undefined> {
    const userSessionId = this.ctx.req.session.user.id;

    return await this.findById(userSessionId);
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
      .leftJoinAndSelect("user.state", "state")
      .skip(itemsToSkip)
      .take(per_page)
      .orderBy(getOrderBy(), order_type)
      .getMany();

    const count = await this.count(search);

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

  async count(search: string = ""): Promise<number> {
    return await getConnection()
      .createQueryBuilder()
      .from(User, "user")
      .where("user.username like :username", { username: `%${search}%` })
      .orWhere("user.name like :name", { name: `%${search}%` })
      .orWhere("user.last_name like :last_name", {
        last_name: `%${search}%`,
      })
      .orWhere("user.id = :id", { id: search })
      .getCount();
  }

  async changeState(id: number): Promise<number> {
    const state = await this.getState(id);

    const newState = state?.state_id === 1 ? 2 : 1;

    await getConnection()
      .createQueryBuilder()
      .update(User)
      .set({ state_id: newState })
      .where("id = :id", { id: id })
      .execute();

    return newState;
  }

  async getState(id: number): Promise<{ state_id: number } | undefined> {
    return await getConnection()
      .createQueryBuilder()
      .select("user.state_id")
      .from(User, "user")
      .where("user.id = :id", { id: id })
      .getOne();
  }

  async update(data: UpdateUserFields): Promise<User | undefined> {
    await getConnection()
      .createQueryBuilder()
      .update(User)
      .set(data.user)
      .where("id = :id", { id: data.id })
      .execute();

    return await this.findById(data.id);
  }
}
