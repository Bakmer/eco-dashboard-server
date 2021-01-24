"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSchema = void 0;
const type_graphql_1 = require("type-graphql");
const User_1 = require("../resolvers/User");
const Hello_1 = require("../resolvers/Hello");
const Store_1 = require("../resolvers/Store");
const createSchema = () => type_graphql_1.buildSchema({
    resolvers: [User_1.UserResolver, Hello_1.HelloResolver, Store_1.StoreResolver],
    authChecker: ({ context: { req } }, roles) => {
        console.log(req.session);
        console.log(roles);
        return false;
    },
});
exports.createSchema = createSchema;
//# sourceMappingURL=createSchema.js.map