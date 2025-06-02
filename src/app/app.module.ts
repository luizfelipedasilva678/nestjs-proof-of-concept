import { Module } from '@nestjs/common';
import { TasksModule } from '../tasks/tasks.module';
import { UsersModule } from 'src/users/users.module';
import { AuthModule } from 'src/auth/auth.module';
import { AppController } from './app.controller';

@Module({
  imports: [TasksModule, UsersModule, AuthModule],
  controllers: [AppController],
})
export class AppModule {}
