import { Address } from "../entities/Address";
import { getConnection } from "typeorm";

export default {
  async softDelete(id: number): Promise<void> {
    await getConnection()
      .createQueryBuilder()
      .softDelete()
      .from(Address)
      .where("id = :id", { id })
      .execute();
  },

  async restore(id: number): Promise<void> {
    await getConnection()
      .createQueryBuilder()
      .restore()
      .from(Address)
      .where("id = :id", { id })
      .execute();
  },
};
