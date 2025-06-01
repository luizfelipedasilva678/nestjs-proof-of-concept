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

  async getTask(id: number): Promise<TaskDTO | undefined> {
    const task = await this.taskRepository.getTask(id);

    if (!task) {
      return undefined;
    }

    return TasksMapper.toTaskDTO(task);
  }

  async getTasks(
    page: number = 1,
    limit: number = 10,
  ): Promise<{
    page: number;
    perPage: number;
    total: number;
    results: TaskDTO[];
  }> {
    const result = await this.taskRepository.getTasks(page, limit);

    return {
      page: result.page,
      perPage: result.perPage,
      total: result.total,
      results: result.results.map((task) => TasksMapper.toTaskDTO(task)),
    };
  }

  async createTask(createTaskDto: TaskDTO): Promise<TaskDTO> {
    return TasksMapper.toTaskDTO(
      await this.taskRepository.createTask(TasksMapper.toTask(createTaskDto)),
    );
  }

  async deleteTask(id: number): Promise<void> {
    await this.taskRepository.deleteTask(id);
  }

  async updateTask(task: TaskDTO): Promise<TaskDTO> {
    return TasksMapper.toTaskDTO(
      await this.taskRepository.updateTask(TasksMapper.toTask(task)),
    );
  }
}
