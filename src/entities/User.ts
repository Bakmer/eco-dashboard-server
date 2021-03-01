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
  JoinColumn,
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
  @Column()
  name: string;

  @Field()
  @Column()
  last_name: string;

  @Field()
  @Authorized(ADMIN)
  @Column()
  password!: string;

  @Field()
  @Column()
  store_id: number;

  @Field()
  @Column()
  role_id: number;

  @Field()
  @Column()
  state_id: number;

  @Field(() => Store)
  @ManyToOne(() => Store, (store) => store.users)
  @JoinColumn({
    name: "store_id",
  })
  store: Store;

  @Field(() => Role)
  @ManyToOne(() => Role, (role) => role.users)
  @JoinColumn({
    name: "role_id",
  })
  role: Role;

  @Field(() => State)
  @ManyToOne(() => State, (state) => state.users)
  @JoinColumn({
    name: "state_id",
  })
  state: State;

  @Field(() => [Client])
  @OneToMany(() => Client, (client) => client.user)
  clients: Client[];

  @Field(() => String)
  @CreateDateColumn()
  created_at: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updated_at: Date;
}
