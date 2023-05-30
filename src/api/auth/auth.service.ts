import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { compareHash, generateHash } from '../../shared/utils/bcrypt';
import { MailService } from '../mail/mail.service';
import { generateToken } from '../../shared/utils/token-generator';
import { CreateUserDto } from '../user/dto/create-user.dto';
import * as moment from 'moment';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private mailService: MailService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, pass: string): Promise<any> {
    const user = await this.userService.getByEmail(email);

    if (!user) throw new UnauthorizedException('User not found');

    const isValid = await compareHash(pass, user?.password);
    if (!isValid) {
      throw new BadRequestException('Incorrect password');
    }

    const payload = {
      email: user.email,
      sub: user.id,
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
      user: { email: user.email, id: user.id },
    };
  }

  async signUp(body: CreateUserDto): Promise<any> {
    body.password = await generateHash(body.password);
    const newUser = await this.userService.createUser(body);

    const payload = {
      email: newUser.email,
      sub: newUser.id,
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
      user: { email: newUser.email, id: newUser.id },
    };
  }

  async forgotPassword(email: string): Promise<any> {
    const user = await this.userService.getByEmail(email);

    if (!user) throw new UnauthorizedException('User not found');
    const token = await generateToken();
    const expiresIn = moment().add(1, 'hour').toDate();

    await this.userService.update(user.id, {
      resetToken: token,
      resetTokenExpires: expiresIn,
    });
    this.mailService.sendUserConfirmation(user, token);
  }

  async resetPassword(password: string, token: string): Promise<any> {
    const user = await this.userService.getByEmail(token);

    if (!user) throw new UnauthorizedException('User not found');

    await this.userService.update(user.id, {
      password,
    });

    return { message: 'Password updated successfully' };
  }
}
