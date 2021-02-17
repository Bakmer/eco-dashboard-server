import { Arg, Mutation, Resolver, Authorized, Query, Ctx } from "type-graphql";
import messages from "../../constants/messages";
import { StateResponse, ListStatesResponse, CreateStateFields } from "./types";

import { State } from "../../entities/State";
import { ADMIN } from "../../constants/roles";
import { MyContext } from "src/types/MyContext";

const {
  STORE_REGISTER_ERROR,
  STORE_REGISTER_SUCCESS,
  STATES_LIST_SUCCESSFUL,
  GENERIC_ERROR,
} = messages;

@Resolver(State)
export class StateResolver {
  @Mutation(() => StateResponse)
  @Authorized(ADMIN)
  async createState(
    @Arg("data") { name }: CreateStateFields,
    @Ctx() { dataSources: { stateService } }: MyContext
  ): Promise<StateResponse> {
    try {
      const newState = await stateService.create(name);

      return { data: newState, message: STORE_REGISTER_SUCCESS };
    } catch (error) {
      return new Error(STORE_REGISTER_ERROR);
    }
  }

  @Query(() => ListStatesResponse)
  @Authorized()
  async listStates(
    @Ctx() { dataSources: { stateService } }: MyContext
  ): Promise<ListStatesResponse> {
    try {
      const state = await stateService.list();

      return {
        data: state,
        message: STATES_LIST_SUCCESSFUL,
      };
    } catch (error) {
      console.log(error);
      if (error.code === "ER_DUP_ENTRY") {
        return new Error(error.sqlMessage);
      } else {
        return new Error(GENERIC_ERROR);
      }
    }
  }
}
