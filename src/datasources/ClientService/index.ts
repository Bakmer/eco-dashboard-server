import { DataSource, DataSourceConfig } from "apollo-datasource";
import { Client } from "../../entities/Client";
import { MyContext } from "../../types/MyContext";
import { StateRepository, ClientRepository } from "../../repositories";
import messages from "../../constants/messages";

import { CreateFields } from "../../resolvers/Client/types";

const { STATES_NOT_FOUND_RESPONSE } = messages;

export default class ClientService extends DataSource {
  ctx: MyContext;

  constructor() {
    super();
  }

  initialize(config: DataSourceConfig<MyContext>) {
    this.ctx = config.context;
  }

  async create(data: CreateFields): Promise<Client> {
    const stateExists = await StateRepository.findById(data.state_id);
    if (!stateExists) {
      throw { InputErr: STATES_NOT_FOUND_RESPONSE };
    }

    const userSession = this.ctx.req.session.user;
    const store_id = data.store_id ? data.store_id : userSession.store_id;
    const user_id = userSession.id;

    return ClientRepository.create({
      ...data,
      store_id,
      user_id,
    });
  }
}
