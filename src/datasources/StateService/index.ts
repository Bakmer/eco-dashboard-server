import { DataSource, DataSourceConfig } from "apollo-datasource";
import { getConnection } from "typeorm";
import { State } from "../../entities/State";
import { MyContext } from "../../types/MyContext";

export default class StateService extends DataSource {
  ctx: MyContext;

  constructor() {
    super();
  }

  initialize(config: DataSourceConfig<MyContext>) {
    this.ctx = config.context;
  }

  async create(name: string): Promise<State> {
    return await State.create({ name }).save();
  }

  async list(): Promise<State[]> {
    return await getConnection()
      .createQueryBuilder()
      .select("state")
      .from(State, "state")
      .getMany();
  }

  async findById(id: number): Promise<State | undefined> {
    return await State.findOne({ id });
  }
}
