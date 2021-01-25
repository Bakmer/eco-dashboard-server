import { Arg, Mutation, Resolver, Authorized } from "type-graphql";
import { CreateRoleField } from "./types";
import messages from "../../constants/messages";
import { RoleResponse } from "./types";

import { Roles as Role } from "../../entities/Role";
import { ADMIN } from "../../constants/roles";

const { ROLE_CREATED_SUCCESSFULLY, ROLE_REGISTER_ERROR } = messages;

@Resolver(Role)
export class RoleResolver {
  @Mutation(() => RoleResponse)
  @Authorized(ADMIN)
  async createRole(
    @Arg("data") { name }: CreateRoleField
  ): Promise<RoleResponse> {
    try {
      const newRole = await Role.create({ name }).save();

      return { data: newRole, message: ROLE_CREATED_SUCCESSFULLY };
    } catch (error) {
      return new Error(ROLE_REGISTER_ERROR);
    }
  }
}
