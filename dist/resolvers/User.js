"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserResolver = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const constants_1 = require("../constants");
const types_1 = require("./types");
const User_1 = require("../entities/User");
const Store_1 = require("../entities/Store");
let UserResolver = class UserResolver {
    name(user) {
        return `Se ha creado a ${user.username}`;
    }
    register(options, { req }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const store = yield Store_1.Stores.findOne({ id: options.storeId });
                if (!store) {
                    return {
                        errors: [constants_1.storeNotFoundResponse],
                    };
                }
            }
            catch (error) {
                return {
                    errors: [constants_1.storeNotFoundResponse],
                };
            }
            let user;
            try {
                const newUser = yield User_1.Users.create(Object.assign({}, options)).save();
                user = newUser;
            }
            catch (error) {
                return {
                    errors: [
                        {
                            field: "error",
                            message: error.message,
                        },
                    ],
                };
            }
            req.session.userId = user.id;
            return { user };
        });
    }
    me({ req }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!req.session.userId) {
                return null;
            }
            let user = yield typeorm_1.getConnection()
                .createQueryBuilder()
                .select("user")
                .from(User_1.Users, "user")
                .where("user.id = :id", { id: req.session.userId })
                .leftJoinAndSelect("user.store", "store")
                .getOne();
            return user;
        });
    }
    deleteAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            yield typeorm_1.getConnection().createQueryBuilder().delete().from(User_1.Users).execute();
            return "Se han eliminado todos los usuarios";
        });
    }
};
__decorate([
    type_graphql_1.FieldResolver(() => String),
    __param(0, type_graphql_1.Root()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [User_1.Users]),
    __metadata("design:returntype", void 0)
], UserResolver.prototype, "name", null);
__decorate([
    type_graphql_1.Mutation(() => types_1.UserResponse),
    __param(0, type_graphql_1.Arg("options")),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [types_1.UsernamePasswordInput, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "register", null);
__decorate([
    type_graphql_1.Query(() => User_1.Users, { nullable: true }),
    __param(0, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "me", null);
__decorate([
    type_graphql_1.Mutation(() => String),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "deleteAllUsers", null);
UserResolver = __decorate([
    type_graphql_1.Resolver(User_1.Users)
], UserResolver);
exports.UserResolver = UserResolver;
//# sourceMappingURL=User.js.map