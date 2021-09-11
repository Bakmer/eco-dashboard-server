import { Discount } from "../entities/Discount";
import { getConnection } from "typeorm";

export const DiscountRepository = {
  create(percentage: number): Promise<Discount> {
    return Discount.create({ percentage }).save();
  },

  findById(id: number): Promise<Discount | undefined> {
    return Discount.findOne({ id });
  },

  findByName(percentage: number): Promise<Discount | undefined> {
    return getConnection()
      .createQueryBuilder()
      .select("discount")
      .from(Discount, "discount")
      .where("discount.percentage = :percentage", { percentage })
      .getOne();
  },

  list(): Promise<Discount[]> {
    return getConnection()
      .createQueryBuilder()
      .select("discount")
      .from(Discount, "discount")
      .getMany();
  },
};
