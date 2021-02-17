import { MyContext } from "src/types/MyContext";
import { Resolver, Arg, Ctx, Mutation, Authorized } from "type-graphql";
import { UserInputError } from "apollo-server-express";
import messages from "../../constants/messages";
import { ClientResponse, CreateFields } from "./types";

import { Client } from "../../entities/Client";

const {
  STATES_NOT_FOUND_RESPONSE,
  CLIENT_CREATE_SUCCESS,
  GENERIC_ERROR,
} = messages;

@Resolver(Client)
export class ClientResolver {
  @Mutation(() => ClientResponse)
  @Authorized()
  async createClient(
    @Arg("data") data: CreateFields,
    @Ctx() { dataSources: { clientService, stateService } }: MyContext
  ): Promise<ClientResponse> {
    try {
      const state = await stateService.findById(data.stateId);
      if (!state) {
        return new UserInputError(STATES_NOT_FOUND_RESPONSE);
      }

      const newClient = await clientService.create(data);

      return {
        data: newClient,
        message: CLIENT_CREATE_SUCCESS,
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
