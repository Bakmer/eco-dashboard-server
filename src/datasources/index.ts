import UserService from "./UserService";
import StoreService from "./StoreService";
import RoleService from "./RoleService";
import StateService from "./StateService";
import ClientService from "./ClientService";
import DiscountService from "./DiscountService";
import PhoneService from "./PhoneService";

export default () => ({
  userService: new UserService(),
  storeService: new StoreService(),
  roleService: new RoleService(),
  stateService: new StateService(),
  clientService: new ClientService(),
  discountService: new DiscountService(),
  phoneService: new PhoneService(),
});
