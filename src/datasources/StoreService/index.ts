import { DataSource, DataSourceConfig } from "apollo-datasource";
import { getConnection } from "typeorm";
import { Store } from "../../entities/Store";
import { MyContext } from "../../types/MyContext";

import { CreateStoreFields } from "../../resolvers/Store/types";

export default class UserService extends DataSource {
  ctx: MyContext;

  constructor() {
    super();
  }

  initialize(config: DataSourceConfig<MyContext>) {
    this.ctx = config.context;
  }

  async create(data: CreateStoreFields): Promise<Store> {
    return await Store.create(data).save();
  }

  async list(): Promise<Store[]> {
    return await getConnection()
      .createQueryBuilder()
      .select("store")
      .from(Store, "store")
      .leftJoinAndSelect("store.users", "users")
      .getMany();
  }

  async findById(id: number): Promise<Store | undefined> {
    return await Store.findOne({ id });
  }
}
