import { Body, Controller, Post } from '@nestjs/common';
import { TasksService } from './tasks.service';
import TaskDTO from './task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly taskService: TasksService) {}

  @Post()
  createTask(@Body() createTaskDto: TaskDTO) {
    return this.taskService.createTask(createTaskDto);
  }
}
