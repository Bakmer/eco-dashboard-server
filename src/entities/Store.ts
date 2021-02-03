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
import { Users as User } from "./User";
import { Clients as Client } from "./Client";

@ObjectType()
@Entity()
export class Stores extends BaseEntity {
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
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}
