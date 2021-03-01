import { Client } from "../entities/Client";
import { getConnection } from "typeorm";

import { CreateFields } from "../resolvers/Client/types";

export default {
  async create(data: CreateFields): Promise<Client> {
    return Client.create(data).save();
  },

  findById(id: number): Promise<Client | undefined> {
    return getConnection()
      .createQueryBuilder()
      .select("client")
      .from(Client, "client")
      .where("client.id = :id", { id })
      .leftJoinAndSelect("client.store", "store")
      .leftJoinAndSelect("client.discount", "discount")
      .leftJoinAndSelect("client.state", "state")
      .leftJoinAndSelect("client.user", "user")
      .leftJoinAndSelect("client.phones", "phones")
      .leftJoinAndSelect("client.shippings", "shippings")
      .leftJoinAndSelect("shippings.transport", "transport")
      .leftJoinAndSelect("client.billings", "billings")
      .leftJoinAndSelect("billings.iva", "iva")
      .leftJoinAndSelect("client.addresses", "addresses")
      .getOne();
  },

  findByName(name: string): Promise<Client | undefined> {
    return getConnection()
      .createQueryBuilder()
      .select("client")
      .from(Client, "client")
      .where("client.name = :name", { name })
      .getOne();
  },

  list(
    search: string,
    itemsToSkip: number,
    per_page: number,
    order_by: string,
    order_type: "ASC" | "DESC"
  ): Promise<Client[]> {
    return getConnection()
      .createQueryBuilder()
      .select("client")
      .from(Client, "client")
      .where("client.name like :name", { name: `%${search}%` })
      .orWhere("client.last_name like :last_name", {
        last_name: `%${search}%`,
      })
      .orWhere("client.id = :id", { id: search })
      .leftJoinAndSelect("client.store", "store")
      .leftJoinAndSelect("client.discount", "discount")
      .leftJoinAndSelect("client.state", "state")
      .skip(itemsToSkip)
      .take(per_page)
      .orderBy(order_by, order_type)
      .getMany();
  },

  count(search: string): Promise<number> {
    return getConnection()
      .createQueryBuilder()
      .from(Client, "client")
      .where("client.name like :name", { name: `%${search}%` })
      .orWhere("client.last_name like :last_name", {
        last_name: `%${search}%`,
      })
      .orWhere("client.id = :id", { id: search })
      .getCount();
  },
};
