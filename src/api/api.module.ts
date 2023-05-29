import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { SocketGateway } from './socket/socket.getaway';

@Module({
  imports: [UsersModule, AuthModule],
  providers: [SocketGateway],
})
export class ApiModule {}
