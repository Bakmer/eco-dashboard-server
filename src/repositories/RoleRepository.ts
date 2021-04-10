import { Role } from "../entities/Role";
import { getConnection } from "typeorm";

export const RoleRepository = {
  create(name: string): Promise<Role> {
    return Role.create({ name }).save();
  },

  findById(id: number): Promise<Role | undefined> {
    return Role.findOne({ id });
  },

  findByName(name: string): Promise<Role | undefined> {
    return getConnection()
      .createQueryBuilder()
      .select("role")
      .from(Role, "role")
      .where("role.name = :name", { name })
      .getOne();
  },

  list(): Promise<Role[]> {
    return getConnection()
      .createQueryBuilder()
      .select("role")
      .from(Role, "role")
      .getMany();
  },
};
