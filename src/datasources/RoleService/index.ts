import { DataSource, DataSourceConfig } from "apollo-datasource";
import { Role } from "../../entities/Role";
import { MyContext } from "../../types/MyContext";
import { RoleRepository } from "../../repositories";
import messages from "../../constants/messages";

const { ROLE_ALREADY_EXISTS } = messages;

export default class RoleService extends DataSource {
  ctx: MyContext;

  constructor() {
    super();
  }

  initialize(config: DataSourceConfig<MyContext>) {
    this.ctx = config.context;
  }

  async create(name: string): Promise<Role> {
    const roleExists = await RoleRepository.findByName(name);
    if (roleExists) {
      throw { InputErr: ROLE_ALREADY_EXISTS };
    }

    return RoleRepository.create(name);
  }

  list(): Promise<Role[]> {
    return RoleRepository.list();
  }
}
