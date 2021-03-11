import { User } from "../entities/User";
import { getConnection } from "typeorm";

import { CreateUserFields, UpdateUserFields } from "../resolvers/User/types";

export default {
  create(data: CreateUserFields): Promise<User> {
    return User.create(data).save();
  },

  simpleFindById(id: number): Promise<User | undefined> {
    return getConnection()
      .createQueryBuilder()
      .select("user")
      .from(User, "user")
      .where("user.id = :id", { id })
      .getOne();
  },

  findById(id: number): Promise<User | undefined> {
    return getConnection()
      .createQueryBuilder()
      .select("user")
      .from(User, "user")
      .where("user.id = :id", { id })
      .leftJoinAndSelect("user.store", "store")
      .leftJoinAndSelect("user.role", "role")
      .leftJoinAndSelect("user.state", "state")
      .getOne();
    // I can also do it without query builder
    // const user = await User.findOne({ id: req.session.user });
  },

  findByUsername(username: string): Promise<User | undefined> {
    return getConnection()
      .createQueryBuilder()
      .select("user")
      .from(User, "user")
      .where("user.username = :username", { username })
      .leftJoinAndSelect("user.store", "store")
      .leftJoinAndSelect("user.role", "role")
      .leftJoinAndSelect("user.state", "state")
      .getOne();
  },

  list(
    search: string,
    itemsToSkip: number,
    per_page: number,
    order_by: string,
    order_type: "ASC" | "DESC"
  ): Promise<User[]> {
    return getConnection()
      .createQueryBuilder()
      .select("user")
      .from(User, "user")
      .where("user.username like :username", { username: `%${search}%` })
      .orWhere("user.name like :name", { name: `%${search}%` })
      .orWhere("user.last_name like :last_name", {
        last_name: `%${search}%`,
      })
      .orWhere("user.id = :id", { id: search })
      .leftJoinAndSelect("user.store", "store")
      .leftJoinAndSelect("user.role", "role")
      .leftJoinAndSelect("user.state", "state")
      .skip(itemsToSkip)
      .take(per_page)
      .orderBy(order_by, order_type)
      .getMany();
  },

  count(search: string): Promise<number> {
    return getConnection()
      .createQueryBuilder()
      .from(User, "user")
      .where("user.username like :username", { username: `%${search}%` })
      .orWhere("user.name like :name", { name: `%${search}%` })
      .orWhere("user.last_name like :last_name", {
        last_name: `%${search}%`,
      })
      .orWhere("user.id = :id", { id: search })
      .getCount();
  },

  async changeState(id: number, newState: number): Promise<void> {
    await getConnection()
      .createQueryBuilder()
      .update(User)
      .set({ state_id: newState })
      .where("id = :id", { id: id })
      .execute();
  },

  async update(data: UpdateUserFields): Promise<void> {
    await getConnection().createQueryBuilder().update(User).set(data.user).where("id = :id", { id: data.id }).execute();
  },

  async softDelete(id: number, username: string): Promise<void> {
    await getConnection()
      .createQueryBuilder()
      .update(User)
      .set({ username: `${username}::${new Date()}` })
      .where("id = :id", { id })
      .execute();

    await getConnection().createQueryBuilder().softDelete().from(User).where("id = :id", { id }).execute();
  },
};
