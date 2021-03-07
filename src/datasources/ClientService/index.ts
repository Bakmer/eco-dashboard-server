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
} from "../../repositories";
import messages from "../../constants/messages";
import { capitalize } from "../../utils";

import {
  CreateFields,
  PaginatedClientsResponse,
} from "../../resolvers/Client/types";
import { PaginationFields, OrderType } from "../../resolvers/sharedTypes";

const {
  STATES_NOT_FOUND_RESPONSE,
  DISCOUNT_NOT_FOUND_RESPONSE,
  DELETE_CLIENT_ERROR,
  FIND_CLIENT_ERROR,
  RESTORE_CLIENT_ERROR,
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
    const state = await StateRepository.findById(data.state_id);
    if (!state) {
      throw { InputErr: STATES_NOT_FOUND_RESPONSE };
    }

    const discount = await DiscountRepository.findById(data.discount_id);
    if (!discount) {
      throw { InputErr: DISCOUNT_NOT_FOUND_RESPONSE };
    }

    const userSession = this.ctx.req.session.user;
    const store_id = data.store_id ? data.store_id : userSession.store_id;
    const user_id = userSession.id;

    const newClient = await ClientRepository.create({
      ...data,
      name: capitalize(data.name),
      last_name: capitalize(data.last_name),
      store_id,
      user_id,
    });

    return ClientRepository.findById(newClient.id);
  }

  findById(id: number): Promise<Client | undefined> {
    return ClientRepository.findById(id);
  }

  async list(vars: PaginationFields): Promise<PaginatedClientsResponse> {
    const getOrderBy = () => {
      const order_by = vars?.order_by;
      if (!order_by) {
        return "client.id";
      }
      if (
        order_by === "store" ||
        order_by === "state" ||
        order_by === "discount"
      ) {
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

    const users = await ClientRepository.list(
      search,
      itemsToSkip,
      per_page,
      getOrderBy(),
      order_type
    );

    const count = await ClientRepository.count(search);

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
    const state = await ClientRepository.getState(id);
    if (!state) {
      throw { InputErr: STATES_NOT_FOUND_RESPONSE };
    }

    const newState = state.state_id === 1 ? 2 : 1;

    await ClientRepository.changeState(id, newState);

    return newState;
  }

  async delete(id: number): Promise<void> {
    const client = await ClientRepository.findById(id);
    if (!client) {
      throw { InputErr: DELETE_CLIENT_ERROR };
    }

    await ClientRepository.softDelete(id, client.email);

    if (client.addresses.length) {
      for (let i = 0; i < client.addresses.length; i++) {
        AddressRepository.softDelete(client.addresses[i].id);
      }
    }

    if (client.phones.length) {
      for (let i = 0; i < client.phones.length; i++) {
        PhoneRepository.softDelete(client.phones[i].id);
      }
    }

    if (client.billings.length) {
      for (let i = 0; i < client.billings.length; i++) {
        BillingRepository.softDelete(client.billings[i].id);
      }
    }

    if (client.shippings.length) {
      for (let i = 0; i < client.shippings.length; i++) {
        ShippingRepository.softDelete(client.shippings[i].id);
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
