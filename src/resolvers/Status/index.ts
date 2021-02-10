import { Arg, Mutation, Resolver, Authorized, Query } from "type-graphql";
import { CreateStatusFields } from "./types";
import { getConnection } from "typeorm";
import messages from "../../constants/messages";
import { StatusResponse, ListStatusResponse } from "./types";

import { Status } from "../../entities/Status";
import { ADMIN } from "../../constants/roles";

const {
  STORE_REGISTER_ERROR,
  STORE_REGISTER_SUCCESS,
  STATUS_LIST_SUCCESSFUL,
  GENERIC_ERROR,
} = messages;

@Resolver(Status)
export class StatusResolver {
  @Mutation(() => StatusResponse)
  @Authorized(ADMIN)
  async createStatus(
    @Arg("data") { name }: CreateStatusFields
  ): Promise<StatusResponse> {
    try {
      const newStatus = await Status.create({ name }).save();

      return { data: newStatus, message: STORE_REGISTER_SUCCESS };
    } catch (error) {
      return new Error(STORE_REGISTER_ERROR);
    }
  }

  @Query(() => ListStatusResponse)
  @Authorized()
  async listStatus(): Promise<ListStatusResponse> {
    try {
      const status = await getConnection()
        .createQueryBuilder()
        .select("status")
        .from(Status, "status")
        .getMany();

      return {
        data: status,
        message: STATUS_LIST_SUCCESSFUL,
      };
    } catch (error) {
      console.log(error);
      return new Error(GENERIC_ERROR);
    }
  }
}
