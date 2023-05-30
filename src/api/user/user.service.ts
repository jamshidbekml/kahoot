import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';

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

  public createUser(values: CreateUserDto): Promise<User> {
    const user: User = new User();

    Object.assign(user, values);

    return this.repository.save(user);
  }
}
