import { Response } from "express";
import { Redis } from "ioredis";
import { Session } from "express-session";

import UserService from "../datasources/UserService";
import StoreService from "../datasources/StoreService";
import RoleService from "../datasources/RoleService";

interface DataSources {
  userService: UserService;
  storeService: StoreService;
  roleService: RoleService;
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
    roleId: number;
    storeId: number;
  };
}
