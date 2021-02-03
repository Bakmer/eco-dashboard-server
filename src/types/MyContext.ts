import { Response } from "express";
import { Redis } from "ioredis";
import { Session } from "express-session";

export type MyContext = {
  req: Request & { session: userSession };
  redis: Redis;
  res: Response;
};

interface userSession extends Session {
  user: {
    id: number;
    roleId: number;
    storeId: number;
  };
}
