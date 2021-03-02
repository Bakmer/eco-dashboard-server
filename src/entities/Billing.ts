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
import { Iva } from "./Iva";

@ObjectType()
@Entity()
export class Billing extends BaseEntity {
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
  memo: string;

  @Field()
  @Column({ unique: true })
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
  iva_id: number;

  @Field(() => Client)
  @ManyToOne(() => Client, (client) => client.billings)
  @JoinColumn({
    name: "client_id",
  })
  client: Client;

  @Field(() => Iva)
  @ManyToOne(() => Iva, (iva) => iva.billings)
  @JoinColumn({
    name: "iva_id",
  })
  iva: Iva;

  @Field(() => Date)
  @CreateDateColumn()
  created_at: Date;

  @Field(() => Date)
  @UpdateDateColumn()
  updated_at: Date;
}
