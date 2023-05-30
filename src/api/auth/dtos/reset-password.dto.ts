import { IsDefined, IsNotEmpty, IsString } from 'class-validator';

export class ResetPasswordDto {
  @IsNotEmpty()
  @IsDefined()
  @IsString()
  email: string;
}
