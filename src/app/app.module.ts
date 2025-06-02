import { Module } from '@nestjs/common';
import { TasksModule } from '../tasks/tasks.module';
import { UsersModule } from 'src/users/users.module';
import { AuthModule } from 'src/auth/auth.module';
import { AppController } from './app.controller';
import { KnexModule } from 'src/knex/knex.module';

@Module({
  imports: [
    TasksModule,
    UsersModule,
    AuthModule,
    KnexModule.forRoot({
      client: 'mysql',
      connection: {
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: 'root',
        database: 'app',
      },
    }),
  ],
  controllers: [AppController],
})
export class AppModule {}
