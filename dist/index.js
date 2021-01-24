"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
require("dotenv-safe/config");
const apollo_server_express_1 = require("apollo-server-express");
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const typeorm_1 = require("typeorm");
const cors_1 = __importDefault(require("cors"));
const constants_1 = require("./constants");
const ioredis_1 = __importDefault(require("ioredis"));
const connect_redis_1 = __importDefault(require("connect-redis"));
const createSchema_1 = require("./utils/createSchema");
const graphql_query_complexity_1 = require("graphql-query-complexity");
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    yield typeorm_1.createConnection();
    const app = express_1.default();
    const RedisStore = connect_redis_1.default(express_session_1.default);
    const redis = new ioredis_1.default(process.env.REDIS_URL);
    app.use(express_session_1.default({
        name: constants_1.COOKIE_NAME,
        store: new RedisStore({
            client: redis,
            disableTouch: true,
        }),
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
            httpOnly: true,
            sameSite: "lax",
            secure: constants_1.__prod__,
            domain: constants_1.__prod__ ? ".codeponder.com" : undefined,
        },
        saveUninitialized: false,
        secret: process.env.SESSION_SECRET,
        resave: false,
    }));
    app.use(cors_1.default({
        origin: process.env.CORS_ORIGIN,
        credentials: true,
    }));
    const schema = yield createSchema_1.createSchema();
    const apolloServer = new apollo_server_express_1.ApolloServer({
        schema,
        context: ({ req, res }) => ({
            req,
            res,
            redis,
        }),
        formatError: (error) => {
            var _a;
            if ((_a = error.extensions) === null || _a === void 0 ? void 0 : _a.exception.validationErrors.length) {
                let errors = [];
                const validationErrors = error.extensions.exception.validationErrors;
                for (let i = 0; i < validationErrors.length; i++) {
                    const constraints = Object.values(validationErrors[i].constraints);
                    for (let x = 0; x < constraints.length; x++) {
                        errors.push({
                            field: validationErrors[i].property,
                            message: constraints[x],
                        });
                    }
                }
                return Object.assign(Object.assign({}, error), { errors });
            }
            return error;
        },
        plugins: [
            {
                requestDidStart: () => ({
                    didResolveOperation({ request, document }) {
                        const complexity = graphql_query_complexity_1.getComplexity({
                            schema,
                            operationName: request.operationName,
                            query: document,
                            variables: request.variables,
                            estimators: [
                                graphql_query_complexity_1.fieldExtensionsEstimator(),
                                graphql_query_complexity_1.simpleEstimator({ defaultComplexity: 1 }),
                            ],
                        });
                        if (complexity > 20) {
                            throw new Error(`Sorry, too complicated query! ${complexity} is over 20 that is the max allowed complexity.`);
                        }
                        console.log("Used query complexity points:", complexity);
                    },
                }),
            },
        ],
    });
    apolloServer.applyMiddleware({
        app,
        cors: false,
    });
    app.listen(parseInt(process.env.PORT), () => {
        console.log("server started on localhost:4000");
    });
});
main().catch((err) => {
    console.error(err);
});
//# sourceMappingURL=index.js.map