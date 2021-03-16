import { DataSource, DataSourceConfig } from "apollo-datasource";
import { Phone } from "../../entities/Phone";
import { MyContext } from "../../types/MyContext";
import { PhoneRepository, ClientRepository } from "../../repositories";
import { CreatePhoneFields, UpdatePhoneFields } from "../../resolvers/Phone/types";
import messages from "../../constants/messages";
import { capitalize } from "../../utils";

const { CLIENT_NOT_FOUND, DELETE_PHONE_ERROR, PHONE_NOT_FOUND, GENERIC_ERROR } = messages;

export default class PhoneService extends DataSource {
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

    return PhoneRepository.create({
      ...data,
      name: capitalize(data.name),
    });
  }

  async update(data: UpdatePhoneFields): Promise<Phone | undefined> {
    const phone = await PhoneRepository.findById(data.id);
    if (!phone) {
      throw { InputErr: PHONE_NOT_FOUND };
    }

    if (phone.client_id !== data.phone.client_id) {
      throw { Err: GENERIC_ERROR };
    }

    await PhoneRepository.update({
      ...data,
      phone: {
        ...data.phone,
        name: capitalize(data.phone.name),
      },
    });

    return PhoneRepository.findById(data.id);
  }

  async delete(id: number): Promise<void> {
    const phone = await PhoneRepository.findById(id);
    if (!phone) {
      throw { InputErr: DELETE_PHONE_ERROR };
    }

    await PhoneRepository.delete(id);
  }

  //   list(): Promise<Discount[]> {
  //     return PhoneRepository.list();
  //   }
}
