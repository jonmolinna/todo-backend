import { IsNotEmpty, Length } from "class-validator";
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Users } from "./User";

@Entity()
export class Lists {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  @Length(1, 20)
  nameList: string;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Users, (user) => user.lists)
  user: Users;
}
