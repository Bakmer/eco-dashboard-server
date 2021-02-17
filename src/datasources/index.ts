import UserService from "./UserService";
import StoreService from "./StoreService";
import RoleService from "./RoleService";
import StateService from "./StateService";
import ClientService from "./ClientService";

export default () => ({
  userService: new UserService(),
  storeService: new StoreService(),
  roleService: new RoleService(),
  stateService: new StateService(),
  clientService: new ClientService(),
});
