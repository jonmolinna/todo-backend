import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from "class-validator";

import { Users } from "../entity/User";
import { AppDataSource } from "../data-source";

export function IsUserAlreadyExist(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: {
        validate(userName: any, args: ValidationArguments) {
          return AppDataSource.getRepository(Users)
            .findOneBy({ username: userName })
            .then((user) => {
              if (user) return false;
              return true;
            });
        },
      },
    });
  };
}
