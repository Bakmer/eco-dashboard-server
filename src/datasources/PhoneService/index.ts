import { DataSource, DataSourceConfig } from "apollo-datasource";
import { Phone } from "../../entities/Phone";
import { MyContext } from "../../types/MyContext";
import { PhoneRepository, ClientRepository } from "../../repositories";
import { CreatePhoneFields } from "../../resolvers/Phone/types";
import messages from "../../constants/messages";

const { CLIENT_NOT_FOUND } = messages;

export default class DiscountService extends DataSource {
  ctx: MyContext;

  constructor() {
    super();
  }

  initialize(config: DataSourceConfig<MyContext>) {
    this.ctx = config.context;
  }

  async create(data: CreatePhoneFields): Promise<Phone> {
    const client = await ClientRepository.simpleFindById(data.client_id);
    if (!client) {
      throw { InputErr: CLIENT_NOT_FOUND };
    }

    return PhoneRepository.create(data);
  }

  //   list(): Promise<Discount[]> {
  //     return PhoneRepository.list();
  //   }
}
