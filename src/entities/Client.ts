import { ObjectType, Field } from "type-graphql";
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
import { State } from "./State";
import { User } from "./User";
import { Address } from "./Address";
import { Shipping } from "./Shipping";
import { Billing } from "./Billing";
import { Phone } from "./Phone";
import { Discount } from "./Discount";

@ObjectType()
@Entity()
export class Client extends BaseEntity {
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
  email: string;

  @Field()
  @Column()
  memo: string;

  @Field()
  @Column()
  store_id: number;

  @Field()
  @Column()
  state_id: number;

  @Field()
  @Column()
  discount_id: number;

  @Field()
  @Column()
  user_id: number;

  @Field(() => Store)
  @ManyToOne(() => Store, (store) => store.clients)
  @JoinColumn({
    name: "store_id",
  })
  store: Store;

  @Field(() => State)
  @ManyToOne(() => State, (state) => state.clients)
  @JoinColumn({
    name: "state_id",
  })
  state: State;

  @Field(() => Discount)
  @ManyToOne(() => Discount, (discount) => discount.clients)
  @JoinColumn({
    name: "discount_id",
  })
  discount: Discount;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.clients)
  @JoinColumn({
    name: "user_id",
  })
  user: User;

  @Field(() => [Phone], { nullable: true })
  @OneToMany(() => Phone, (phone) => phone.client, { nullable: true })
  phones: Phone[];

  @Field(() => [Shipping], { nullable: true })
  @OneToMany(() => Shipping, (shipping) => shipping.client, { nullable: true })
  shippings: Shipping[];

  @Field(() => [Billing], { nullable: true })
  @OneToMany(() => Billing, (billing) => billing.client, { nullable: true })
  billings: Billing[];

  @Field(() => [Address], { nullable: true })
  @OneToMany(() => Address, (address) => address.client, { nullable: true })
  addresses: Address[];

  @Field(() => String)
  @CreateDateColumn()
  created_at: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updated_at: Date;
}
