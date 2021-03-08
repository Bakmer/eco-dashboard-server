import { Response } from "express";
import { Redis } from "ioredis";
import { Session } from "express-session";

import UserService from "../datasources/UserService";
import StoreService from "../datasources/StoreService";
import RoleService from "../datasources/RoleService";
import StateService from "../datasources/StateService";
import ClientService from "../datasources/ClientService";
import DiscountService from "../datasources/DiscountService";

interface DataSources {
  userService: UserService;
  storeService: StoreService;
  roleService: RoleService;
  stateService: StateService;
  clientService: ClientService;
  discountService: DiscountService;
}

export type MyContext = {
  req: Request & { session: userSession };
  redis: Redis;
  res: Response;
  dataSources: DataSources;
};

interface userSession extends Session {
  user: {
    id: number;
    role_id: number;
    store_id: number;
  };
}
