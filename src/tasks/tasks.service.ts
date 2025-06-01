import { Inject, Injectable } from '@nestjs/common';
import TaskRepository from './ports/tasks.repository';
import TaskDTO from './task.dto';
import TasksMapper from './tasks.mapper';

@Injectable()
export class TasksService {
  constructor(
    @Inject('TaskRepository')
    private readonly taskRepository: TaskRepository,
  ) {}

  async createTask(createTaskDto: TaskDTO): Promise<TaskDTO> {
    return TasksMapper.toTaskDTO(
      await this.taskRepository.createTask(TasksMapper.toTask(createTaskDto)),
    );
  }
}
