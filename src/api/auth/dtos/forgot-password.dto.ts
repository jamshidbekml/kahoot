import { IsDefined, IsNotEmpty, IsString } from 'class-validator';

export class ForgotPasswordDto {
  @IsNotEmpty()
  @IsDefined()
  @IsString()
  email: string;
}
