import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';
import { AuthDto } from './dtos/auth.dto';
import { ResetPasswordDto } from './dtos/reset-password.dto';

@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Public()
  @Post('login')
  signIn(@Body() body: AuthDto) {
    return this.authService.signIn(body.email, body.password);
  }

  @Post('reset-password')
  resetPassword(@Body() body: ResetPasswordDto) {}
}
