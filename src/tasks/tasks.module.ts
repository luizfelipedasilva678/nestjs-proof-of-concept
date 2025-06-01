import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import TaskRepositoryInMemory from './tasks.repository';

@Module({
  controllers: [TasksController],
  providers: [
    TasksService,
    { provide: 'TaskRepository', useClass: TaskRepositoryInMemory },
  ],
})
export class TasksModule {}
