import { Phone } from "../entities/Phone";
import { getConnection } from "typeorm";

export default {
  async softDelete(id: number): Promise<void> {
    await getConnection()
      .createQueryBuilder()
      .softDelete()
      .from(Phone)
      .where("id = :id", { id })
      .execute();
  },

  async restore(id: number): Promise<void> {
    await getConnection()
      .createQueryBuilder()
      .restore()
      .from(Phone)
      .where("id = :id", { id })
      .execute();
  },
};
