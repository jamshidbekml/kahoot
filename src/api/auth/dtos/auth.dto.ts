import { IsDefined, IsNotEmpty, IsString } from 'class-validator';

export class AuthDto {
  @IsNotEmpty()
  @IsDefined()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsDefined()
  @IsString()
  password: string;
}
