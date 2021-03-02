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
exports.User = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const Store_1 = require("./Store");
const Role_1 = require("./Role");
const Client_1 = require("./Client");
const State_1 = require("./State");
const roles_1 = require("../constants/roles");
let User = class User extends typeorm_1.BaseEntity {
};
__decorate([
    type_graphql_1.Field(),
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column({ unique: true }),
    __metadata("design:type", String)
], User.prototype, "username", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", String)
], User.prototype, "last_name", void 0);
__decorate([
    type_graphql_1.Field(),
    type_graphql_1.Authorized(roles_1.ADMIN),
    typeorm_1.Column(),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", Number)
], User.prototype, "store_id", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", Number)
], User.prototype, "role_id", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", Number)
], User.prototype, "state_id", void 0);
__decorate([
    type_graphql_1.Field(() => Store_1.Store),
    typeorm_1.ManyToOne(() => Store_1.Store, (store) => store.users),
    typeorm_1.JoinColumn({
        name: "store_id",
    }),
    __metadata("design:type", Store_1.Store)
], User.prototype, "store", void 0);
__decorate([
    type_graphql_1.Field(() => Role_1.Role),
    typeorm_1.ManyToOne(() => Role_1.Role, (role) => role.users),
    typeorm_1.JoinColumn({
        name: "role_id",
    }),
    __metadata("design:type", Role_1.Role)
], User.prototype, "role", void 0);
__decorate([
    type_graphql_1.Field(() => State_1.State),
    typeorm_1.ManyToOne(() => State_1.State, (state) => state.users),
    typeorm_1.JoinColumn({
        name: "state_id",
    }),
    __metadata("design:type", State_1.State)
], User.prototype, "state", void 0);
__decorate([
    type_graphql_1.Field(() => [Client_1.Client]),
    typeorm_1.OneToMany(() => Client_1.Client, (client) => client.user),
    __metadata("design:type", Array)
], User.prototype, "clients", void 0);
__decorate([
    type_graphql_1.Field(() => Date),
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date)
], User.prototype, "created_at", void 0);
__decorate([
    type_graphql_1.Field(() => Date),
    typeorm_1.UpdateDateColumn(),
    __metadata("design:type", Date)
], User.prototype, "updated_at", void 0);
User = __decorate([
    type_graphql_1.ObjectType(),
    typeorm_1.Entity()
], User);
exports.User = User;
//# sourceMappingURL=User.js.map