import { ObjectType, Field, Authorized } from "type-graphql";
import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  BaseEntity,
  ManyToOne,
} from "typeorm";
import { Stores as Store } from "./Store";
import { Roles as Role } from "./Role";
import { Status } from "./Status";
import { ADMIN } from "../constants/roles";

@ObjectType()
@Entity()
export class Users extends BaseEntity {
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
  statusId: number;

  @Field(() => Store)
  @ManyToOne(() => Store, (store) => store.users)
  store: Store;

  @Field(() => Role)
  @ManyToOne(() => Role, (role) => role.users)
  role: Role;

  @Field(() => Status)
  @ManyToOne(() => Status, (status) => status.users)
  status: Status;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}
