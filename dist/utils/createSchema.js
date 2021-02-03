"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSchema = void 0;
const type_graphql_1 = require("type-graphql");
const User_1 = require("../resolvers/User");
const Hello_1 = require("../resolvers/Hello");
const Store_1 = require("../resolvers/Store");
const Role_1 = require("../resolvers/Role");
const Status_1 = require("../resolvers/Status");
const Client_1 = require("../resolvers/Client");
const createSchema = () => type_graphql_1.buildSchema({
    resolvers: [
        User_1.UserResolver,
        Hello_1.HelloResolver,
        Store_1.StoreResolver,
        Role_1.RoleResolver,
        Status_1.StatusResolver,
        Client_1.ClientResolver,
    ],
    authChecker: ({ context: { req } }, roles) => {
        const user = req.session.user;
        if (roles.length === 0) {
            return user !== undefined;
        }
        if (!user) {
            return false;
        }
        for (let i = 0; i < roles.length; i++) {
            if (roles[i] === user.roleId) {
                return true;
            }
        }
        return false;
    },
});
exports.createSchema = createSchema;
//# sourceMappingURL=createSchema.js.map