import { ObjectType, Field } from "type-graphql";
import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  BaseEntity,
  OneToMany,
} from "typeorm";
import { User } from "./User";
import { Client } from "./Client";

@ObjectType()
@Entity()
export class Store extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column({ unique: true })
  name!: string;

  @Field(() => [User])
  @OneToMany(() => User, (user) => user.store)
  users: User[];

  @Field(() => [Client])
  @OneToMany(() => Client, (client) => client.store)
  clients: Client[];

  @Field(() => String)
  @CreateDateColumn()
  created_at: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updated_at: Date;
}
