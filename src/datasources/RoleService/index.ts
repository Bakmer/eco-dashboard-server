import { DataSource, DataSourceConfig } from "apollo-datasource";
import { getConnection } from "typeorm";
import { Role } from "../../entities/Role";
import { MyContext } from "../../types/MyContext";

export default class RoleService extends DataSource {
  ctx: MyContext;

  constructor() {
    super();
  }

  initialize(config: DataSourceConfig<MyContext>) {
    this.ctx = config.context;
  }

  async create(name: string): Promise<Role> {
    return await Role.create({ name }).save();
  }

  async list(): Promise<Role[]> {
    return await getConnection()
      .createQueryBuilder()
      .select("role")
      .from(Role, "role")
      .getMany();
  }

  async findById(id: number): Promise<Role | undefined> {
    return await Role.findOne({ id });
  }
}
