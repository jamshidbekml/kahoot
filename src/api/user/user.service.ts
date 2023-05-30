import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThan, Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { generateHash } from 'src/shared/utils/bcrypt';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  @InjectRepository(User)
  private readonly repository: Repository<User>;

  public getUser(id: number): Promise<User> {
    return this.repository.findOne({ where: { id } });
  }

  public async getByEmail(email: string): Promise<User> {
    const user = await this.repository.findOne({
      where: {
        email,
      },
    });

    if (!user) throw new NotFoundException('User not found');

    return user;
  }

  public async findByToken(token: string): Promise<User> {
    const user = await this.repository.findOne({
      where: {
        resetToken: token,
        resetTokenExpires: MoreThan(new Date()),
      },
    });

    if (!user) throw new BadRequestException('Invalid or expired token');

    return user;
  }

  public async createUser(values: CreateUserDto): Promise<User> {
    const user = await this.repository.findOne({
      where: {
        email: values.email,
      },
    });

    if (user) throw new BadRequestException('Email already in use');

    const newUser: User = new User();

    Object.assign(newUser, values);

    return this.repository.save(newUser);
  }

  public async update(id: number, values: UpdateUserDto): Promise<User> {
    const user = await this.repository.findOne({
      where: {
        id,
      },
    });

    if (!user) throw new NotFoundException('User not found');

    if (values.password) {
      values.password = await generateHash(values.password);
    } else values.password = user.password;

    Object.assign(user, values);

    return await this.repository.save(user);
  }
}
