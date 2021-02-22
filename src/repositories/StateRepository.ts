import { State } from "../entities/State";
import { getConnection } from "typeorm";

export default {
  create(name: string): Promise<State> {
    return State.create({ name }).save();
  },

  findById(id: number): Promise<State | undefined> {
    return State.findOne({ id });
  },

  findByName(name: string): Promise<State | undefined> {
    return getConnection()
      .createQueryBuilder()
      .select("state")
      .from(State, "state")
      .where("state.name = :name", { name })
      .getOne();
  },

  list(): Promise<State[]> {
    return getConnection()
      .createQueryBuilder()
      .select("state")
      .from(State, "state")
      .getMany();
  },
};
