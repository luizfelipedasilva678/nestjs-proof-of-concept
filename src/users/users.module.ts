import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import UserRepositoryInRDB from './users.repository';

@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    { provide: 'UserRepository', useClass: UserRepositoryInRDB },
  ],
  exports: [UsersService],
})
export class UsersModule {}
