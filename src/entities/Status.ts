import { ObjectType, Field } from "type-graphql";
import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  BaseEntity,
  OneToMany,
} from "typeorm";
import { Users as User } from "./User";

@ObjectType()
@Entity()
export class Status extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column({ unique: true })
  name!: string;

  @OneToMany(() => User, (user) => user.status)
  users: User[];

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}
