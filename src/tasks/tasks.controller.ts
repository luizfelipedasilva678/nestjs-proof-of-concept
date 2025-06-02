import { AuthGuard } from 'src/auth/auth.guard';
import TaskDTO from './task.dto';
import { TasksService } from './tasks.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';

@Controller('tasks')
export class TasksController {
  constructor(private readonly taskService: TasksService) {}

  @Post()
  @UseGuards(AuthGuard)
  createTask(@Body() createTaskDto: TaskDTO) {
    return this.taskService.createTask(createTaskDto);
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  async getTask(@Param('id', ParseIntPipe) id: number) {
    const task = await this.taskService.getTask(id);

    if (!task) {
      throw new NotFoundException("Task doesn't exist");
    }

    return this.taskService.getTask(id);
  }

  @Get()
  @UseGuards(AuthGuard)
  async getTasks(
    @Query('page', new ParseIntPipe({ optional: true })) page?: number,
    @Query('perPage', new ParseIntPipe({ optional: true })) perPage?: number,
  ) {
    return await this.taskService.getTasks(
      page && page > 0 ? page : 1,
      perPage && perPage > 0 ? perPage : 10,
    );
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  updateTask(@Param('id', ParseIntPipe) id: number, @Body() task: TaskDTO) {
    task.id = id;
    return this.taskService.updateTask(task);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  deleteTask(@Param('id', ParseIntPipe) id: number) {
    return this.taskService.deleteTask(id);
  }
}
