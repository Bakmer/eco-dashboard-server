import { ObjectType, Field, Authorized } from "type-graphql";
import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  BaseEntity,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Store } from "./Store";
import { Role } from "./Role";
import { Client } from "./Client";
import { State } from "./State";
import { ADMIN } from "../constants/roles";

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column({ unique: true })
  username!: string;

  @Field()
  @Column({ nullable: true })
  name?: string;

  @Field()
  @Column({ nullable: true })
  last_name?: string;

  @Field()
  @Authorized(ADMIN)
  @Column()
  password!: string;

  @Field()
  @Column()
  storeId: number;

  @Field()
  @Column()
  roleId: number;

  @Field()
  @Column()
  stateId: number;

  @Field(() => Store)
  @ManyToOne(() => Store, (store) => store.users)
  store: Store;

  @Field(() => Role)
  @ManyToOne(() => Role, (role) => role.users)
  role: Role;

  @Field(() => State)
  @ManyToOne(() => State, (state) => state.users)
  state: State;

  @Field(() => [Client])
  @OneToMany(() => Client, (client) => client.user)
  clients: Client[];

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}
