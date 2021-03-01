import { ObjectType, Field } from "type-graphql";
import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  BaseEntity,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Client } from "./Client";

@ObjectType()
@Entity()
export class Phone extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  area_code_1: string;

  @Field()
  @Column()
  phone_1: string;

  @Field()
  @Column()
  client_id: number;

  @Field(() => Client)
  @ManyToOne(() => Client, (client) => client.phones)
  @JoinColumn({
    name: "client_id",
  })
  client: Client;

  @Field(() => String)
  @CreateDateColumn()
  created_at: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updated_at: Date;
}
