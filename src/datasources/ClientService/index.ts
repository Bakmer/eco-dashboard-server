import { DataSource, DataSourceConfig } from "apollo-datasource";
import { Client } from "../../entities/Client";
import { MyContext } from "../../types/MyContext";
import {
  StateRepository,
  ClientRepository,
  DiscountRepository,
  AddressRepository,
  BillingRepository,
  PhoneRepository,
  ShippingRepository,
  StoreRepository,
} from "../../repositories";
import messages from "../../constants/messages";
import { capitalize } from "../../utils";

import { CreateFields, PaginatedClientsResponse, UpdateFields } from "../../resolvers/Client/types";
import { PaginationFields, OrderType } from "../../resolvers/sharedTypes";

const {
  STATES_NOT_FOUND_RESPONSE,
  DISCOUNT_NOT_FOUND_RESPONSE,
  DELETE_CLIENT_ERROR,
  FIND_CLIENT_ERROR,
  RESTORE_CLIENT_ERROR,
  STORE_NOT_FOUND_RESPONSE,
  CLIENT_NOT_FOUND,
} = messages;

export default class ClientService extends DataSource {
  ctx: MyContext;

  constructor() {
    super();
  }

  initialize(config: DataSourceConfig<MyContext>) {
    this.ctx = config.context;
  }

  async create(data: CreateFields): Promise<Client | undefined> {
    const validations = await Promise.all([
      StateRepository.findById(data.state_id),
      DiscountRepository.findById(data.discount_id),
      data.store_id ? StoreRepository.findById(data.store_id) : undefined,
    ]);

    if (!validations[0]) {
      throw { InputErr: STATES_NOT_FOUND_RESPONSE };
    }

    if (!validations[1]) {
      throw { InputErr: DISCOUNT_NOT_FOUND_RESPONSE };
    }

    const userSession = this.ctx.req.session.user;
    const user_id = userSession.id;
    let store_id;

    if (data.store_id) {
      if (!validations[2]) {
        throw { InputErr: STORE_NOT_FOUND_RESPONSE };
      }
      store_id = data.store_id;
    } else {
      store_id = userSession.store_id;
    }

    const newClient = await ClientRepository.create({
      ...data,
      name: capitalize(data.name),
      last_name: capitalize(data.last_name),
      store_id,
      user_id,
    });

    return ClientRepository.findById(newClient.id);
  }

  async findById(id: number): Promise<Client | undefined> {
    const client = await ClientRepository.findById(id);

    if (!client) {
      throw { Err: CLIENT_NOT_FOUND };
    }

    return client;
  }

  async list(vars: PaginationFields): Promise<PaginatedClientsResponse> {
    const getOrderBy = () => {
      const order_by = vars?.order_by;
      if (!order_by) {
        return "client.id";
      }
      if (order_by === "store" || order_by === "state" || order_by === "discount") {
        return `${order_by}.id`;
      } else {
        return `client.${order_by}`;
      }
    };
    const search = vars?.search ? vars.search : "";
    const page = vars?.page ? vars.page : 0;
    const order_type: OrderType = vars?.order_type ? vars.order_type : "DESC";
    const order_by = vars.order_by ? vars.order_by : "created_at";
    const per_page = vars?.per_page ? vars.per_page : 30;
    const itemsToSkip = vars?.per_page ? vars.per_page * page : 0;

    const listData = await Promise.all([
      ClientRepository.list(search, itemsToSkip, per_page, getOrderBy(), order_type),
      ClientRepository.count(search),
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

  async changeState(id: number): Promise<Client | undefined> {
    const state = await ClientRepository.getState(id);
    if (!state) {
      throw { InputErr: STATES_NOT_FOUND_RESPONSE };
    }

    const newState = state.state_id === 1 ? 2 : 1;

    await ClientRepository.changeState(id, newState);

    return ClientRepository.findById(id);
  }

  async update(data: UpdateFields): Promise<Client | undefined> {
    const validations = await Promise.all([
      ClientRepository.simpleFindById(data.id),
      StateRepository.findById(data.client.state_id),
      DiscountRepository.findById(data.client.discount_id),
      StoreRepository.findById(data.client.store_id),
    ]);

    if (!validations[0]) {
      throw { InputErr: CLIENT_NOT_FOUND };
    }

    if (!validations[1]) {
      throw { InputErr: STATES_NOT_FOUND_RESPONSE };
    }

    if (!validations[2]) {
      throw { InputErr: DISCOUNT_NOT_FOUND_RESPONSE };
    }

    if (!validations[3]) {
      throw { InputErr: STORE_NOT_FOUND_RESPONSE };
    }

    await ClientRepository.update({
      ...data,
      client: {
        ...data.client,
        name: capitalize(data.client.name),
        last_name: capitalize(data.client.last_name),
      },
    });

    return ClientRepository.findById(data.id);
  }

  async delete(id: number): Promise<void> {
    const client = await ClientRepository.findById(id);
    if (!client) {
      throw { InputErr: DELETE_CLIENT_ERROR };
    }

    await ClientRepository.delete(id, client.email);

    if (client.addresses.length) {
      for (let i = 0; i < client.addresses.length; i++) {
        AddressRepository.delete(client.addresses[i].id);
      }
    }

    if (client.phones.length) {
      for (let i = 0; i < client.phones.length; i++) {
        PhoneRepository.delete(client.phones[i].id);
      }
    }

    if (client.billings.length) {
      for (let i = 0; i < client.billings.length; i++) {
        BillingRepository.delete(client.billings[i].id);
      }
    }

    if (client.shippings.length) {
      for (let i = 0; i < client.shippings.length; i++) {
        ShippingRepository.delete(client.shippings[i].id);
      }
    }
  }

  async restore(id: number): Promise<Client> {
    const client = await ClientRepository.findWithDeleted(id);
    if (!client) {
      throw { InputErr: FIND_CLIENT_ERROR };
    } else if (!client.deleted_at) {
      throw { InputErr: RESTORE_CLIENT_ERROR };
    }

    await ClientRepository.restore(id);

    if (client.addresses.length) {
      for (let i = 0; i < client.addresses.length; i++) {
        AddressRepository.restore(client.addresses[i].id);
      }
    }

    if (client.phones.length) {
      for (let i = 0; i < client.phones.length; i++) {
        PhoneRepository.restore(client.phones[i].id);
      }
    }

    if (client.billings.length) {
      for (let i = 0; i < client.billings.length; i++) {
        BillingRepository.restore(client.billings[i].id);
      }
    }

    if (client.shippings.length) {
      for (let i = 0; i < client.shippings.length; i++) {
        ShippingRepository.restore(client.shippings[i].id);
      }
    }

    return client;
  }

  async destroy(id: number): Promise<void> {
    const client = await ClientRepository.findWithDeleted(id);
    if (!client) {
      throw { InputErr: FIND_CLIENT_ERROR };
    }

    await ClientRepository.destroy(id);
  }
}
