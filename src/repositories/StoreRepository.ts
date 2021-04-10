import { Store } from "../entities/Store";
import { getConnection } from "typeorm";

export const StoreRepository = {
  create(name: string): Promise<Store> {
    return Store.create({ name }).save();
  },

  findByName(name: string): Promise<Store | undefined> {
    return getConnection()
      .createQueryBuilder()
      .select("store")
      .from(Store, "store")
      .where("store.name = :name", { name })
      .getOne();
  },

  findById(id: number): Promise<Store | undefined> {
    return Store.findOne({ id });
  },

  list(): Promise<Store[]> {
    return getConnection()
      .createQueryBuilder()
      .select("store")
      .from(Store, "store")
      .leftJoinAndSelect("store.users", "users")
      .getMany();
  },
};
