import { Module } from '@nestjs/common';
import { UserModule } from './users/user.module';
import { AuthModule } from './auth/auth.module';
import { SocketGateway } from './socket/socket.getaway';
import { MailService } from './mail/mail.service';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [UserModule, AuthModule, MailModule],
  providers: [SocketGateway, MailService],
})
export class ApiModule {}
