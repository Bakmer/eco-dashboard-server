import { MyContext } from "src/types/MyContext";
import { Resolver, Arg, Ctx, Mutation, Authorized, Query } from "type-graphql";
import messages from "../../constants/messages";
import { handleError } from "../../utils";
import {
  ClientResponse,
  CreateFields,
  GetUserFields,
  PaginatedClientsResponse,
  DeleteClientFields,
  UpdateFields,
} from "./types";
import { PaginationFields, ChangeStateFields, ChangeStateResponse, ApiResponse } from "../sharedTypes";

import { Client } from "../../entities/Client";

const {
  CLIENT_CREATE_SUCCESS,
  CLIENTS_LIST_SUCCESSFUL,
  GENERIC_ERROR,
  CHANGE_CLIENT_STATE_SUCCESS,
  DELETE_CLIENT_SUCCESS,
  RESTORE_CLIENT_SUCCESS,
  DESTROY_CLIENT_SUCCESS,
  UPDATE_CLIENT_SUCCESS,
} = messages;

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

  @Mutation(() => ClientResponse)
  @Authorized()
  async updateClient(
    @Arg("data") data: UpdateFields,
    @Ctx() { dataSources: { clientService } }: MyContext
  ): Promise<ClientResponse> {
    try {
      const updatedClient = await clientService.update(data);

      return {
        data: updatedClient,
        message: UPDATE_CLIENT_SUCCESS,
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

  @Mutation(() => ChangeStateResponse)
  @Authorized()
  async changeClientState(
    @Arg("data") { id }: ChangeStateFields,
    @Ctx() { dataSources: { clientService } }: MyContext
  ): Promise<ChangeStateResponse> {
    try {
      const newState = await clientService.changeState(id);

      return {
        data: { id: newState, name: newState === 1 ? "Activo" : "Inactivo" },
        message: CHANGE_CLIENT_STATE_SUCCESS,
      };
    } catch (error) {
      console.log(error);
      return handleError(GENERIC_ERROR);
    }
  }

  @Mutation(() => ApiResponse)
  @Authorized()
  async deleteClient(
    @Arg("data") { id }: DeleteClientFields,
    @Ctx()
    { dataSources: { clientService } }: MyContext
  ): Promise<ApiResponse> {
    try {
      await clientService.delete(id);

      return {
        data: { id },
        message: DELETE_CLIENT_SUCCESS,
      };
    } catch (error) {
      return handleError(error);
    }
  }

  @Mutation(() => ClientResponse)
  @Authorized()
  async restoreClient(
    @Arg("data") { id }: DeleteClientFields,
    @Ctx()
    { dataSources: { clientService } }: MyContext
  ): Promise<ClientResponse> {
    try {
      const client = await clientService.restore(id);

      return {
        data: client,
        message: RESTORE_CLIENT_SUCCESS,
      };
    } catch (error) {
      return handleError(error);
    }
  }

  @Mutation(() => ApiResponse)
  @Authorized()
  async destroyClient(
    @Arg("data") { id }: DeleteClientFields,
    @Ctx()
    { dataSources: { clientService } }: MyContext
  ): Promise<ApiResponse> {
    try {
      await clientService.destroy(id);

      return {
        data: { id },
        message: DESTROY_CLIENT_SUCCESS,
      };
    } catch (error) {
      return handleError(error);
    }
  }
}
