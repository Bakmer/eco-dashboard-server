import { Shipping } from "../entities/Shipping";
import { getConnection } from "typeorm";
import { UpdateShippingFields, CreateShipping } from "../resolvers/Shipping/types";

export default {
  create(data: CreateShipping): Promise<Shipping> {
    return Shipping.create(data).save();
  },

  findById(id: number): Promise<Shipping | undefined> {
    return getConnection()
      .createQueryBuilder()
      .select("shipping")
      .from(Shipping, "shipping")
      .where("shipping.id = :id", { id })
      .leftJoinAndSelect("shipping.transport", "transport")
      .getOne();
  },

  async delete(id: number): Promise<void> {
    await getConnection().createQueryBuilder().softDelete().from(Shipping).where("id = :id", { id }).execute();
  },

  async restore(id: number): Promise<void> {
    await getConnection().createQueryBuilder().restore().from(Shipping).where("id = :id", { id }).execute();
  },

  async update(data: UpdateShippingFields): Promise<void> {
    await getConnection()
      .createQueryBuilder()
      .update(Shipping)
      .set(data.shipping)
      .where("id = :id", { id: data.id })
      .execute();
  },
};
