import { IsBoolean, IsDate, IsNotEmpty, Length } from "class-validator";
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { IsMinDate } from "../decorator/Validation";
import { Lists } from "./Lists";

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
  @IsDate()
  @IsMinDate(new Date(), { message: "Please enter a valid date or greater" })
  date: Date;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Lists)
  list: Lists;
}
