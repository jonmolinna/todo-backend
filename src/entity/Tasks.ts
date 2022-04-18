import { IsBoolean, IsNotEmpty, Length } from "class-validator";
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Lists } from "./Lists";
import { Users } from "./User";

@Entity()
export class Tasks {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  @Length(1, 100)
  task: string;

  @Column()
  @IsBoolean()
  important: boolean;

  @Column()
  @IsBoolean()
  completed: boolean;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Lists)
  list: Lists;
}
