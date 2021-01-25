import { Arg, Mutation, Resolver, Authorized } from "type-graphql";
import { CreateStatusFields } from "./types";
import messages from "../../constants/messages";
import { StatusResponse } from "./types";

import { Status } from "../../entities/Status";
import { ADMIN } from "../../constants/roles";

const { STORE_REGISTER_ERROR, STORE_REGISTER_SUCCESS } = messages;

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
}
