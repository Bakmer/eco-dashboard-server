import { Shipping } from "../entities/Shipping";
import { getConnection } from "typeorm";

export default {
  async softDelete(id: number): Promise<void> {
    await getConnection()
      .createQueryBuilder()
      .softDelete()
      .from(Shipping)
      .where("id = :id", { id })
      .execute();
  },

  async restore(id: number): Promise<void> {
    await getConnection()
      .createQueryBuilder()
      .restore()
      .from(Shipping)
      .where("id = :id", { id })
      .execute();
  },
};
