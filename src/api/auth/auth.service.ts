import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { compareHash } from '../../shared/utils/bcrypt';
import { MailService } from '../mail/mail.service';
import { generateToken } from '../../shared/utils/token-generator';
import { CreateUserDto } from '../user/dto/create-user.dto';

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
      user: { email: user.name, id: user.id },
    };
  }

  async signUp(body: CreateUserDto): Promise<any> {
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

  async resetPassword(email: string): Promise<any> {
    const user = await this.userService.getByEmail(email);

    if (!user) throw new UnauthorizedException('User not found');
    const token = await generateToken();
    this.mailService.sendUserConfirmation(user, token);
  }
}
