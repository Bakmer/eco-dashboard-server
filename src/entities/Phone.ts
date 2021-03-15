import { ObjectType, Field } from "type-graphql";
import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
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
  area_code: string;

  @Field()
  @Column()
  phone: string;

  @Field()
  @Column()
  client_id: number;

  @Field(() => Client)
  @ManyToOne(() => Client, (client) => client.phones, {
    onDelete: "CASCADE",
  })
  @JoinColumn({
    name: "client_id",
  })
  client: Client;

  @Field(() => Date)
  @CreateDateColumn()
  created_at: Date;

  @Field(() => Date)
  @UpdateDateColumn()
  updated_at: Date;

  @Field(() => Date)
  @DeleteDateColumn()
  deleted_at: Date;
}
