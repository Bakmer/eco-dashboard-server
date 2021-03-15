import { Phone } from "../entities/Phone";
import { getConnection } from "typeorm";
import { CreatePhoneFields, UpdatePhoneFields } from "../resolvers/Phone/types";

export default {
  create(data: CreatePhoneFields): Promise<Phone> {
    return Phone.create(data).save();
  },

  findById(id: number): Promise<Phone | undefined> {
    return getConnection()
      .createQueryBuilder()
      .select("phone")
      .from(Phone, "phone")
      .where("phone.id = :id", { id })
      .getOne();
  },

  async delete(id: number): Promise<void> {
    await getConnection().createQueryBuilder().softDelete().from(Phone).where("id = :id", { id }).execute();
  },

  async restore(id: number): Promise<void> {
    await getConnection().createQueryBuilder().restore().from(Phone).where("id = :id", { id }).execute();
  },

  async update(data: UpdatePhoneFields): Promise<void> {
    await getConnection()
      .createQueryBuilder()
      .update(Phone)
      .set(data.phone)
      .where("id = :id", { id: data.id })
      .execute();
  },
};
