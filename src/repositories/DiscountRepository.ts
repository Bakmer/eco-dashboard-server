import { Discount } from "../entities/Discount";
import { getConnection } from "typeorm";

export default {
  create(percentage: number): Promise<Discount> {
    return Discount.create({ percentage }).save();
  },

  findById(id: number): Promise<Discount | undefined> {
    return Discount.findOne({ id });
  },

  list(): Promise<Discount[]> {
    return getConnection()
      .createQueryBuilder()
      .select("discount")
      .from(Discount, "discount")
      .getMany();
  },
};
