import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { getEnvPath } from './common/helper/env.helper';
import { TypeOrmConfigService } from './shared/typeorm/typeorm.service';
import { ApiModule } from './api/api.module';
import { QuizController } from './—no-spec/api/quiz/quiz.controller';
import { Controller } from './—no-spec/api/quiz/.controller';
import { QuizService } from './—no-spec/api/quiz/quiz.service';
import { QuizController } from './—no-spec/api/quiz/quiz.controller';

const envFilePath: string = getEnvPath(`${__dirname}/common/envs`);

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath, isGlobal: true }),
    TypeOrmModule.forRootAsync({ useClass: TypeOrmConfigService }),
    ApiModule,
  ],
  controllers: [AppController, QuizController, Controller],
  providers: [AppService, QuizService],
})
export class AppModule {}
