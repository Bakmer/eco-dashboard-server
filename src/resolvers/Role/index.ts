import { Arg, Mutation, Resolver, Authorized, Query } from "type-graphql";
import { CreateRoleField } from "./types";
import { getConnection } from "typeorm";
import messages from "../../constants/messages";
import { RoleResponse, ListRolesResponse } from "./types";

import { Roles as Role } from "../../entities/Role";
import { ADMIN } from "../../constants/roles";

const {
  ROLE_CREATED_SUCCESSFULLY,
  ROLE_REGISTER_ERROR,
  ROLES_LIST_SUCCESSFUL,
  GENERIC_ERROR,
} = messages;

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

  @Query(() => ListRolesResponse)
  @Authorized()
  async listRoles(): Promise<ListRolesResponse> {
    try {
      const roles = await getConnection()
        .createQueryBuilder()
        .select("role")
        .from(Role, "role")
        .getMany();

      return {
        data: roles,
        message: ROLES_LIST_SUCCESSFUL,
      };
    } catch (error) {
      console.log(error);
      return new Error(GENERIC_ERROR);
    }
  }
}
