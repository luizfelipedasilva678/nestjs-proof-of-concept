import TaskDTO from './task.dto';
import { TasksService } from './tasks.service';
import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';

@Controller('tasks')
export class TasksController {
  constructor(private readonly taskService: TasksService) {}

  @Post()
  createTask(@Body() createTaskDto: TaskDTO) {
    return this.taskService.createTask(createTaskDto);
  }

  @Get(':id')
  async getTask(@Param('id') id: string) {
    const task = await this.taskService.getTask(id);

    if (!task) {
      throw new NotFoundException("Task doesn't exist");
    }

    return this.taskService.getTask(id);
  }

  @Get()
  async getTasks(
    @Query('page', new ParseIntPipe({ optional: true })) page?: number,
    @Query('perPage', new ParseIntPipe({ optional: true })) perPage?: number,
  ) {
    return await this.taskService.getTasks(
      page && page > 0 ? page : 1,
      perPage && perPage > 0 ? perPage : 10,
    );
  }
}
