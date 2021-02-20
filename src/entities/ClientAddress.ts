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
import { ShippingMethod } from "./ShippingMethod";

@ObjectType()
@Entity()
export class ClientAddress extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  last_name: string;

  @Field()
  @Column()
  street: string;

  @Field()
  @Column()
  street_number: number;

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
  area_code_1: string;

  @Field()
  @Column()
  phone_1: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  area_code_2?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  phone_2?: string;

  @Field()
  @Column()
  client_id: number;

  @Field()
  @Column()
  shipping_method_id: number;

  @Field(() => Client)
  @ManyToOne(() => Client, (client) => client.addresses)
  @JoinColumn({
    name: "client_id",
  })
  client: Client;

  @Field(() => ShippingMethod)
  @ManyToOne(() => ShippingMethod, (shipping) => shipping.addresses)
  @JoinColumn({
    name: "shipping_method_id",
  })
  shipping_method: ShippingMethod;

  @Field(() => String)
  @CreateDateColumn()
  created_at: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updated_at: Date;
}
