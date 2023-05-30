import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { SocketGateway } from './socket/socket.getaway';
import { MailService } from './mail/mail.service';
import { MailModule } from './mail/mail.module';
import { QuizModule } from './quiz/quiz.module';
import { QuizModule } from './quiz/quiz.module';

@Module({
  imports: [UserModule, AuthModule, MailModule, QuizModule],
  providers: [SocketGateway, MailService],
})
export class ApiModule {}
