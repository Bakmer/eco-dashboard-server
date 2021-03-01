import { DataSource, DataSourceConfig } from "apollo-datasource";
import { Client } from "../../entities/Client";
import { MyContext } from "../../types/MyContext";
import {
  StateRepository,
  ClientRepository,
  DiscountRepository,
} from "../../repositories";
import messages from "../../constants/messages";
import { capitalize } from "../../utils";

import {
  CreateFields,
  PaginatedClientsResponse,
} from "../../resolvers/Client/types";
import { PaginationFields, OrderType } from "../../resolvers/sharedTypes";

const { STATES_NOT_FOUND_RESPONSE, DISCOUNT_NOT_FOUND_RESPONSE } = messages;

export default class ClientService extends DataSource {
  ctx: MyContext;

  constructor() {
    super();
  }

  initialize(config: DataSourceConfig<MyContext>) {
    this.ctx = config.context;
  }

  async create(data: CreateFields): Promise<Client | undefined> {
    const stateExists = await StateRepository.findById(data.state_id);
    if (!stateExists) {
      throw { InputErr: STATES_NOT_FOUND_RESPONSE };
    }

    const discountExists = await DiscountRepository.findById(data.discount_id);
    if (!discountExists) {
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
      if (order_by === "store" || order_by === "role" || order_by === "state") {
        return `${order_by}.id`;
      } else {
        return `client.${order_by}`;
      }
    };
    const search = vars?.search ? vars.search : "";
    const page = vars?.page ? vars.page : 0;
    const order_type: OrderType = vars?.order_type ? vars.order_type : "DESC";
    const order_by = vars.order_by ? vars.order_by : "id";
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
}
