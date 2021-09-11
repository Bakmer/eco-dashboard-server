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
export class Address extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  street: string;

  @Field()
  @Column()
  street_number: number;

  @Field()
  @Column()
  memo: string;

  @Field()
  @Column()
  province: string;

  @Field()
  @Column()
  location: string;

  @Field()
  @Column()
  postal_code: string;

  @Field()
  @Column()
  client_id: number;

  @Field(() => Client)
  @ManyToOne(() => Client, (client) => client.addresses, {
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
