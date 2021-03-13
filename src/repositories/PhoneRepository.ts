import { Phone } from "../entities/Phone";
import { getConnection } from "typeorm";
import { CreatePhoneFields } from "../resolvers/Phone/types";

export default {
  create(data: CreatePhoneFields): Promise<Phone> {
    return Phone.create(data).save();
  },

  async softDelete(id: number): Promise<void> {
    await getConnection().createQueryBuilder().softDelete().from(Phone).where("id = :id", { id }).execute();
  },

  async restore(id: number): Promise<void> {
    await getConnection().createQueryBuilder().restore().from(Phone).where("id = :id", { id }).execute();
  },
};
