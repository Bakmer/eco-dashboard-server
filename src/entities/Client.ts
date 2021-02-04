import { ObjectType, Field } from "type-graphql";
import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  BaseEntity,
  ManyToOne,
} from "typeorm";
import { Stores as Store } from "./Store";
import { Status } from "./Status";
import { Users as User } from "./User";

@ObjectType()
@Entity()
export class Clients extends BaseEntity {
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
  phone_1: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  phone_2?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  phone_3?: string;

  @Field()
  @Column()
  address_1: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  address_2?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  address_3?: string;

  @Field()
  @Column()
  memo: string;

  @Field()
  @Column()
  storeId: number;

  @Field()
  @Column()
  statusId: number;

  @Field()
  @Column()
  userId: number;

  @Field(() => Store)
  @ManyToOne(() => Store, (store) => store.clients)
  store: Store;

  @Field(() => Status)
  @ManyToOne(() => Status, (status) => status.clients)
  status: Status;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.clients)
  user: User;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}
