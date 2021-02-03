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
  cuit: number;

  @Field()
  @Column()
  iva: string;

  @Field()
  @Column({ unique: true })
  email: string;

  @Field()
  @Column()
  phone_1: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  phone_2?: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  phone_3?: number;

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

  @Field(() => Store)
  @ManyToOne(() => Store, (store) => store.clients)
  store: Store;

  @Field(() => Status)
  @ManyToOne(() => Status, (status) => status.clients)
  status: Status;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}
