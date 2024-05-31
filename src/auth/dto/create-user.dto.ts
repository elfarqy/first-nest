import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { IsUsernameNotEmail } from '../decorator/is-not-exist.decorator';

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  @IsUsernameNotEmail({
    message: 'Username should not match any email in the database',
  })
  username: string;

  @IsNotEmpty()
  @MinLength(2)
  password: string;
}
