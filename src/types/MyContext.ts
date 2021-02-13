import { Response } from "express";
import { Redis } from "ioredis";
import { Session } from "express-session";

import UserService from "../datasources/UserService";

interface DataSources {
  userService: UserService;
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
