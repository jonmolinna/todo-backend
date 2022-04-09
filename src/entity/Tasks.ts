import { IsBoolean, IsNotEmpty, Length } from "class-validator";
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";

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
}
