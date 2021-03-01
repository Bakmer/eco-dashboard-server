import { MyContext } from "src/types/MyContext";
import { Resolver, Arg, Ctx, Mutation, Authorized, Query } from "type-graphql";
import messages from "../../constants/messages";
import { handleError } from "../../utils";
import {
  ClientResponse,
  CreateFields,
  GetUserFields,
  PaginatedClientsResponse,
} from "./types";
import { PaginationFields } from "../sharedTypes";

import { Client } from "../../entities/Client";

const { CLIENT_CREATE_SUCCESS, CLIENTS_LIST_SUCCESSFUL } = messages;

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

  @Query(() => ClientResponse)
  @Authorized()
  async getClient(
    @Arg("vars") { id }: GetUserFields,
    @Ctx() { dataSources: { clientService } }: MyContext
  ): Promise<ClientResponse> {
    try {
      const client = await clientService.findById(id);

      return {
        data: client,
      };
    } catch (error) {
      console.log(error);
      return handleError(error);
    }
  }

  @Query(() => PaginatedClientsResponse)
  @Authorized()
  async listClients(
    @Arg("vars", { nullable: true }) vars: PaginationFields,
    @Ctx() { dataSources: { clientService } }: MyContext
  ): Promise<PaginatedClientsResponse> {
    try {
      const list = await clientService.list(vars);

      return {
        data: list.data,
        filters: list.filters,
        message: CLIENTS_LIST_SUCCESSFUL,
      };
    } catch (error) {
      console.log(error);
      return handleError(error);
    }
  }
}
