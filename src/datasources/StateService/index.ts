import { DataSource, DataSourceConfig } from "apollo-datasource";
import { State } from "../../entities/State";
import { MyContext } from "../../types/MyContext";
import { StateRepository } from "../../repositories";

export default class StateService extends DataSource {
  ctx: MyContext;

  constructor() {
    super();
  }

  initialize(config: DataSourceConfig<MyContext>) {
    this.ctx = config.context;
  }

  create(name: string): Promise<State> {
    return StateRepository.create(name);
  }

  list(): Promise<State[]> {
    return StateRepository.list();
  }
}
