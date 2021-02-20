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
  storeId: number;

  @Field()
  @Column()
  userId: number;

  @Field(() => Store)
  @ManyToOne(() => Store, (store) => store.clients)
  store: Store;

  @Field(() => State)
  @ManyToOne(() => State, (state) => state.clients)
  @JoinColumn({
    name: "state_id",
  })
  state: State;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.clients)
  user: User;

  @Field(() => [ClientAddress])
  @OneToMany(() => ClientAddress, (address) => address.client)
  addresses: ClientAddress[];

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}
