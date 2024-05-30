import { registerDecorator, ValidationOptions } from 'class-validator';
import { IsUsernameNotEmailValidator } from '../validator/is-username-exist.validator';

export function IsUsernameNotEmail(validationOptions?: ValidationOptions) {
  return function (object: NonNullable<unknown>, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsUsernameNotEmailValidator,
    });
  };
}
