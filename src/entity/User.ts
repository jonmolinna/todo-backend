import { IsNotEmpty, Length } from "class-validator";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from "typeorm";

import {
  IsLettersAndSpace,
  IsUserName,
  IsUserAlreadyExist,
} from "../decorator/Validation";
import * as bcrypt from "bcryptjs";
import { Lists } from "./Lists";
import { Tasks } from "./Tasks";

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  @Length(1, 50)
  @IsLettersAndSpace("firstName", { message: "Enter a valid first name" })
  firstName: string;

  @Column()
  @IsNotEmpty()
  @Length(1, 50)
  @IsLettersAndSpace("firstName", { message: "Enter a valid last name" })
  lastName: string;

  @Column()
  @IsNotEmpty()
  @Length(1, 50)
  @IsUserName("username", { message: "Enter a valid username" })
  @IsUserAlreadyExist({
    message: "User already exists",
  })
  username: string;

  @Column()
  @IsNotEmpty()
  password: string;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => Lists, (list) => list.id)
  lists: Lists[];

  @OneToMany(() => Tasks, (task) => task.id)
  tasks: Tasks[];

  hashPassword(): void {
    const salt = bcrypt.genSaltSync(10);
    this.password = bcrypt.hashSync(this.password, salt);
  }

  checkPassword(password: string): boolean {
    return bcrypt.compareSync(password, this.password);
  }
}
