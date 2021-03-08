import { Client } from "../entities/Client";
import { getConnection } from "typeorm";

import { CreateFields, UpdateFields } from "../resolvers/Client/types";

export default {
  async create(data: CreateFields): Promise<Client> {
    return Client.create(data).save();
  },

  simpleFindById(id: number): Promise<Client | undefined> {
    return getConnection()
      .createQueryBuilder()
      .select("client")
      .from(Client, "client")
      .where("client.id = :id", { id })
      .getOne();
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

  findWithDeleted(id: number): Promise<Client | undefined> {
    return getConnection()
      .createQueryBuilder()
      .select("client")
      .withDeleted()
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
      .orWhere("client.email like :email", { email: `%${search}%` })
      .orWhere("client.memo like :memo", { memo: `%${search}%` })
      .orWhere("client.id = :id", { id: search })
      .leftJoinAndSelect("client.store", "store")
      .leftJoinAndSelect("client.discount", "discount")
      .leftJoinAndSelect("client.state", "state")
      .leftJoinAndSelect("client.phones", "phones")
      .leftJoinAndSelect("client.shippings", "shippings")
      .leftJoinAndSelect("shippings.transport", "transport")
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
      .orWhere("client.email = :email", { email: search })
      .orWhere("client.memo = :memo", { memo: search })
      .getCount();
  },

  async changeState(id: number, newState: number): Promise<void> {
    await getConnection()
      .createQueryBuilder()
      .update(Client)
      .set({ state_id: newState })
      .where("id = :id", { id: id })
      .execute();
  },

  getState(id: number): Promise<{ state_id: number } | undefined> {
    return getConnection()
      .createQueryBuilder()
      .select("client.state_id")
      .from(Client, "client")
      .where("client.id = :id", { id: id })
      .getOne();
  },

  async softDelete(id: number, email: string): Promise<void> {
    await getConnection()
      .createQueryBuilder()
      .update(Client)
      .set({ email: `${email}::${new Date()}` })
      .where("id = :id", { id })
      .execute();

    await getConnection().createQueryBuilder().softDelete().from(Client).where("id = :id", { id }).execute();
  },

  async restore(id: number): Promise<void> {
    await getConnection().createQueryBuilder().restore().from(Client).where("id = :id", { id }).execute();
  },

  async destroy(id: number): Promise<void> {
    await getConnection().createQueryBuilder().delete().from(Client).where("id = :id", { id }).execute();
  },

  async update(data: UpdateFields): Promise<void> {
    await getConnection()
      .createQueryBuilder()
      .update(Client)
      .set(data.client)
      .where("id = :id", { id: data.id })
      .execute();
  },
};
