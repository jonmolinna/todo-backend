import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from "class-validator";

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
