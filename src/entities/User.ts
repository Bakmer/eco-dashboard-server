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
import { Roles as Role } from "./Role";

@ObjectType()
@Entity()
export class Users extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column({ unique: true })
  username!: string;

  @Field()
  @Column({ nullable: true })
  name?: string;

  @Field()
  @Column({ nullable: true })
  last_name?: string;

  @Column()
  password!: string;

  @Field()
  @Column()
  storeId: number;

  @Field()
  @Column()
  roleId: number;

  @Field(() => Store)
  @ManyToOne(() => Store, (store) => store.users)
  store: Store;

  @Field(() => Role)
  @ManyToOne(() => Role, (role) => role.users)
  role: Role;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}
