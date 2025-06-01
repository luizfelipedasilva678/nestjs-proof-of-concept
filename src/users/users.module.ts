import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import UsersRepositoryInMemory from './users.repository';

@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    { provide: 'UserRepository', useClass: UsersRepositoryInMemory },
  ],
})
export class UsersModule {}
