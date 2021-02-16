import { Arg, Mutation, Resolver, Authorized, Query, Ctx } from "type-graphql";
import { CreateRoleField } from "./types";
import messages from "../../constants/messages";
import { RoleResponse, ListRolesResponse } from "./types";

import { Roles as Role } from "../../entities/Role";
import { ADMIN } from "../../constants/roles";
import { MyContext } from "src/types/MyContext";

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
    @Arg("data") { name }: CreateRoleField,
    @Ctx() { dataSources: { roleService } }: MyContext
  ): Promise<RoleResponse> {
    try {
      const newRole = await roleService.create(name);

      return { data: newRole, message: ROLE_CREATED_SUCCESSFULLY };
    } catch (error) {
      return new Error(ROLE_REGISTER_ERROR);
    }
  }

  @Query(() => ListRolesResponse)
  @Authorized()
  async listRoles(
    @Ctx() { dataSources: { roleService } }: MyContext
  ): Promise<ListRolesResponse> {
    try {
      const roles = await roleService.list();

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
