import UserService from "./UserService";
import StoreService from "./StoreService";
import RoleService from "./RoleService";

export default () => ({
  userService: new UserService(),
  storeService: new StoreService(),
  roleService: new RoleService(),
});
