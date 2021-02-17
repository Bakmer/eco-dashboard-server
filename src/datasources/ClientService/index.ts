import { DataSource, DataSourceConfig } from "apollo-datasource";
// import { getConnection } from "typeorm";
import { Client } from "../../entities/Client";
import { MyContext } from "../../types/MyContext";

import { CreateFields } from "../../resolvers/Client/types";

export default class ClientService extends DataSource {
  ctx: MyContext;

  constructor() {
    super();
  }

  initialize(config: DataSourceConfig<MyContext>) {
    this.ctx = config.context;
  }

  async create(data: CreateFields): Promise<Client> {
    const userSession = this.ctx.req.session.user;

    return await Client.create({
      ...data,
      storeId: userSession.storeId,
      userId: userSession.id,
    }).save();
  }
}
