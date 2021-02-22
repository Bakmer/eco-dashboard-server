import { MyContext } from "src/types/MyContext";
import { Resolver, Arg, Ctx, Mutation, Authorized } from "type-graphql";
import messages from "../../constants/messages";
import { ClientResponse, CreateFields } from "./types";
import { handleError } from "../../utils";

import { Client } from "../../entities/Client";

const { CLIENT_CREATE_SUCCESS } = messages;

@Resolver(Client)
export class ClientResolver {
  @Mutation(() => ClientResponse)
  @Authorized()
  async createClient(
    @Arg("data") data: CreateFields,
    @Ctx() { dataSources: { clientService } }: MyContext
  ): Promise<ClientResponse> {
    try {
      const newClient = await clientService.create(data);

      return {
        data: newClient,
        message: CLIENT_CREATE_SUCCESS,
      };
    } catch (error) {
      console.log(error);
      return handleError(error);
    }
  }
}
