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
import { ClientAddress } from "./ClientAddress";

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
  razon_social: string;

  @Field()
  @Column({ unique: true })
  cuit: string;

  @Field()
  @Column()
  iva: string;

  @Field()
  @Column({ unique: true })
  email: string;

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

  @Field({ nullable: true })
  @Column({ nullable: true })
  area_code_3?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  phone_3?: string;

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

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.clients)
  @JoinColumn({
    name: "user_id",
  })
  user: User;

  @Field(() => [ClientAddress])
  @OneToMany(() => ClientAddress, (address) => address.client)
  addresses: ClientAddress[];

  @Field(() => String)
  @CreateDateColumn()
  created_at: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updated_at: Date;
}
