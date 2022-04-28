import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from "class-validator";

import { Users } from "../entity/User";
import { AppDataSource } from "../data-source";

export function IsLettersAndSpace(
  property: string,
  validationOptions?: ValidationOptions
) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: "isLettersAndSpace",
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const [relatedPropertyName] = args.constraints;
          const relatedValue = (args.object as any)[relatedPropertyName];
          return (
            typeof value === "string" &&
            typeof relatedValue === "string" &&
            !!value.match(/^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/)
          );
        },
      },
    });
  };
}

export function IsUserName(
  property: string,
  validationOptions?: ValidationOptions
) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: "isUserName",
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const [relatedPropertyName] = args.constraints;
          const relatedValue = (args.object as any)[relatedPropertyName];
          return (
            typeof value === "string" &&
            typeof relatedValue === "string" &&
            !!value.match(/^[a-zA-Z0-9]+([._]?[a-zA-Z0-9]+)*$/)
          );
        },
      },
    });
  };
}

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

export function IsMinDate(
  property: Date,
  validationOptions?: ValidationOptions
) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: "IsMinDate",
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const [relatedPropertyName] = args.constraints;
          const relatedValue = (args.object as any)[relatedPropertyName];
          return (
            new Date(value).toLocaleDateString() >=
            new Date().toLocaleDateString()
          );
        },
      },
    });
  };
}
