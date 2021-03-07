import { Billing } from "../entities/Billing";
import { getConnection } from "typeorm";

export default {
  async softDelete(id: number): Promise<void> {
    await getConnection()
      .createQueryBuilder()
      .softDelete()
      .from(Billing)
      .where("id = :id", { id })
      .execute();
  },

  async restore(id: number): Promise<void> {
    await getConnection()
      .createQueryBuilder()
      .restore()
      .from(Billing)
      .where("id = :id", { id })
      .execute();
  },
};
