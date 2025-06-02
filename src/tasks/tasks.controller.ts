import { AuthGuard } from 'src/auth/auth.guard';
import TaskDTO from './task.dto';
import { TasksService } from './tasks.service';
import TasksMapper from './tasks.mapper';
import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';

@Controller('tasks')
export class TasksController {
  constructor(private readonly taskService: TasksService) {}

  @UseGuards(AuthGuard)
  @Post()
  async createTask(@Req() req: Request, @Body() createTaskDto: TaskDTO) {
    const task = TasksMapper.toTask(createTaskDto);
    const user = req['user'] as { id: number; login: string };
    console.log(user);
    task.getUser().id = user.id;
    task.getUser().login = user.login;

    return TasksMapper.toTaskDTO(await this.taskService.createTask(task));
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  async getTask(@Req() req: Request, @Param('id', ParseIntPipe) id: number) {
    const task = await this.taskService.getTask(id);
    const user = req['user'] as { id: number; login: string };

    if (!task) {
      throw new NotFoundException("Task doesn't exist");
    }

    if (task.getUser().id !== user.id) {
      throw new ForbiddenException();
    }

    return task;
  }

  @Get()
  @UseGuards(AuthGuard)
  async getTasks(
    @Req() req: Request,
    @Query('page', new ParseIntPipe({ optional: true })) page?: number,
    @Query('perPage', new ParseIntPipe({ optional: true })) perPage?: number,
  ) {
    const user = req['user'] as { id: number; login: string };

    const tasks = await this.taskService.getTasks(
      user.id,
      page && page > 0 ? page : 1,
      perPage && perPage > 0 ? perPage : 10,
    );

    return {
      ...tasks,
      results: tasks.results.map((t) => TasksMapper.toTaskDTO(t)),
    };
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  async updateTask(
    @Req() req: Request,
    @Param('id', ParseIntPipe) id: number,
    @Body() updatedTask: TaskDTO,
  ) {
    const user = req['user'] as { id: number; login: string };
    const task = await this.taskService.getTask(id);

    if (!task) {
      throw new NotFoundException("Task doesn't exist");
    }

    if (user.id !== task.getUser().id) {
      throw new ForbiddenException();
    }

    task.setTitle(updatedTask.title);
    task.setDescription(updatedTask.description);
    task.setIsDone(updatedTask.isDone);

    return await this.taskService.updateTask(task);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  async deleteTask(@Req() req: Request, @Param('id', ParseIntPipe) id: number) {
    const user = req['user'] as { id: number; login: string };
    const task = await this.taskService.getTask(id);

    if (!task) {
      throw new NotFoundException("Task doesn't exist");
    }

    if (user.id !== task.getUser().id) {
      throw new ForbiddenException();
    }

    return this.taskService.deleteTask(id);
  }
}
