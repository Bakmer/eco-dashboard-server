import { MyContext } from "src/types/MyContext";
import { Resolver, Arg, Ctx, Mutation, Authorized } from "type-graphql";
import { UserInputError } from "apollo-server-express";
import messages from "../../constants/messages";
import { ClientResponse, CreateFields } from "./types";

import { Clients as Client } from "../../entities/Client";
import { Status } from "../../entities/Status";

const {
  STATUS_NOT_FOUND_RESPONSE,
  CLIENT_CREATE_SUCCESS,
  GENERIC_ERROR,
} = messages;

@Resolver(Client)
export class ClientResolver {
  @Mutation(() => ClientResponse)
  @Authorized()
  async createClient(
    @Arg("data") data: CreateFields,
    @Ctx() { req }: MyContext
  ): Promise<ClientResponse> {
    try {
      const status = await Status.findOne({ id: data.statusId });
      if (!status) {
        return new UserInputError(STATUS_NOT_FOUND_RESPONSE);
      }
    } catch (error) {
      console.log(error);
      return new Error(GENERIC_ERROR);
    }
    console.log("great");
    let client;

    try {
      const newClient = await Client.create({
        ...data,
        storeId: req.session.user.storeId,
      }).save();
      client = newClient;
    } catch (error) {
      console.log(error);
      return new Error(error.message);
    }

    return {
      data: client,
      message: CLIENT_CREATE_SUCCESS,
    };
  }
}
