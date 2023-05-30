import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Query,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';
import { AuthDto } from './dtos/auth.dto';
import { ForgotPasswordDto } from './dtos/forgot-password.dto';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { ResetPasswordDto } from './dtos/reset-password.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Public()
  @Post('signin')
  signIn(@Body() body: AuthDto) {
    return this.authService.signIn(body.email, body.password);
  }

  @Post('signup')
  signUp(@Body() body: CreateUserDto) {
    return this.authService.signUp(body);
  }

  @Post('forgot-password')
  forgotPassword(@Body() body: ForgotPasswordDto) {
    return this.authService.forgotPassword(body.email);
  }

  @Post('reset-password?')
  resetPassword(@Body() body: ResetPasswordDto, @Query('token') token: string) {
    return this.authService.resetPassword(body.password, token);
  }
}
