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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Users = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const Store_1 = require("./Store");
const Role_1 = require("./Role");
const Status_1 = require("./Status");
const roles_1 = require("../constants/roles");
let Users = class Users extends typeorm_1.BaseEntity {
};
__decorate([
    type_graphql_1.Field(),
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Users.prototype, "id", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column({ unique: true }),
    __metadata("design:type", String)
], Users.prototype, "username", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], Users.prototype, "name", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], Users.prototype, "last_name", void 0);
__decorate([
    type_graphql_1.Field(),
    type_graphql_1.Authorized(roles_1.ADMIN),
    typeorm_1.Column(),
    __metadata("design:type", String)
], Users.prototype, "password", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Users.prototype, "storeId", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Users.prototype, "roleId", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Users.prototype, "statusId", void 0);
__decorate([
    type_graphql_1.Field(() => Store_1.Stores),
    typeorm_1.ManyToOne(() => Store_1.Stores, (store) => store.users),
    __metadata("design:type", Store_1.Stores)
], Users.prototype, "store", void 0);
__decorate([
    type_graphql_1.Field(() => Role_1.Roles),
    typeorm_1.ManyToOne(() => Role_1.Roles, (role) => role.users),
    __metadata("design:type", Role_1.Roles)
], Users.prototype, "role", void 0);
__decorate([
    type_graphql_1.Field(() => Status_1.Status),
    typeorm_1.ManyToOne(() => Status_1.Status, (status) => status.users),
    __metadata("design:type", Status_1.Status)
], Users.prototype, "status", void 0);
__decorate([
    type_graphql_1.Field(() => String),
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date)
], Users.prototype, "createdAt", void 0);
__decorate([
    type_graphql_1.Field(() => String),
    typeorm_1.UpdateDateColumn(),
    __metadata("design:type", Date)
], Users.prototype, "updatedAt", void 0);
Users = __decorate([
    type_graphql_1.ObjectType(),
    typeorm_1.Entity()
], Users);
exports.Users = Users;
//# sourceMappingURL=User.js.map