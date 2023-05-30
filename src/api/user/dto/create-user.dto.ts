import { IsDefined, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  public name: string;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  public email: string;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  public password: string;
}
