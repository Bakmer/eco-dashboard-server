import { DataSource, DataSourceConfig } from "apollo-datasource";
import { getConnection } from "typeorm";
import { Users as User } from "../../entities/User";
import { MyContext } from "../../types/MyContext";

import {
  CreateUserFields,
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
      .leftJoinAndSelect("user.status", "status")
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
      .leftJoinAndSelect("user.status", "status")
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
      if (
        order_by === "store" ||
        order_by === "role" ||
        order_by === "status"
      ) {
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
      .leftJoinAndSelect("user.status", "status")
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

  async changeStatus(id: number): Promise<number> {
    const status = await this.getStatus(id);

    const newStatus = status?.statusId === 1 ? 2 : 1;

    await getConnection()
      .createQueryBuilder()
      .update(User)
      .set({ statusId: newStatus })
      .where("id = :id", { id: id })
      .execute();

    return newStatus;
  }

  async getStatus(id: number): Promise<{ statusId: number } | undefined> {
    return await getConnection()
      .createQueryBuilder()
      .select("user.statusId")
      .from(User, "user")
      .where("user.id = :id", { id: id })
      .getOne();
  }
}
