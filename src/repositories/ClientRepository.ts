import { Client } from "../entities/Client";
import { getConnection } from "typeorm";

import { CreateFields } from "../resolvers/Client/types";

export default {
  create(data: CreateFields): Promise<Client> {
    return Client.create(data).save();
  },

  findById(id: number): Promise<Client | undefined> {
    return Client.findOne({ id });
  },

  findByName(name: string): Promise<Client | undefined> {
    return getConnection()
      .createQueryBuilder()
      .select("client")
      .from(Client, "client")
      .where("client.name = :name", { name })
      .getOne();
  },

  list(): Promise<Client[]> {
    return getConnection()
      .createQueryBuilder()
      .select("client")
      .from(Client, "client")
      .getMany();
  },
};
