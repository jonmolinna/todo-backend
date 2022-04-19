import { IsBoolean, IsNotEmpty, Length } from "class-validator";
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Tasks } from "./Tasks";
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
  @IsBoolean()
  flag: boolean;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Users)
  user: Users;

  @OneToMany(() => Tasks, (task) => task.list)
  tasks: Tasks[];
}
