import { DataSource, DataSourceConfig } from "apollo-datasource";
import { Store } from "../../entities/Store";
import { MyContext } from "../../types/MyContext";
import { StoreRepository } from "../../repositories";
import messages from "../../constants/messages";

import { CreateStoreFields } from "../../resolvers/Store/types";

const { STORE_ALREADY_EXISTS } = messages;

export default class UserService extends DataSource {
  ctx: MyContext;

  constructor() {
    super();
  }

  initialize(config: DataSourceConfig<MyContext>) {
    this.ctx = config.context;
  }

  async create({ name }: CreateStoreFields): Promise<Store> {
    const storeExists = await StoreRepository.findByName(name);
    if (storeExists) {
      throw { InputErr: STORE_ALREADY_EXISTS };
    }

    return StoreRepository.create(name);
  }

  list(): Promise<Store[]> {
    return StoreRepository.list();
  }
}
