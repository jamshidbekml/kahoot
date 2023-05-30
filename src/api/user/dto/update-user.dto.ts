import { IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  public name?: string;

  @IsOptional()
  @IsString()
  public email?: string;

  @IsOptional()
  @IsString()
  @MinLength(6)
  public password?: string;

  @IsOptional()
  @IsString()
  public resetToken?: string;

  @IsOptional()
  @IsString()
  public resetTokenExpires?: Date;
}
