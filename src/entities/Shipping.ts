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
import { Transport } from "./Transport";

@ObjectType()
@Entity()
export class Shipping extends BaseEntity {
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
  cuit: string;

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

  @Field()
  @Column()
  transport_id: number;

  @Field(() => Client)
  @ManyToOne(() => Client, (client) => client.shippings)
  @JoinColumn({
    name: "client_id",
  })
  client: Client;

  @Field(() => Transport)
  @ManyToOne(() => Transport, (transport) => transport.shippings)
  @JoinColumn({
    name: "transport_id",
  })
  transport: Transport;

  @Field(() => Date)
  @CreateDateColumn()
  created_at: Date;

  @Field(() => Date)
  @UpdateDateColumn()
  updated_at: Date;
}
