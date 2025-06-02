import { Inject, Injectable } from '@nestjs/common';
import TaskRepository from './ports/tasks.repository';

import Task from './tasks.entity';

@Injectable()
export class TasksService {
  constructor(
    @Inject('TaskRepository')
    private readonly taskRepository: TaskRepository,
  ) {}

  async getTask(id: number): Promise<Task | undefined> {
    const task = await this.taskRepository.getTask(id);

    if (!task) {
      return undefined;
    }

    return task;
  }

  async getTasks(
    userId: number,
    page: number = 1,
    limit: number = 10,
  ): Promise<{
    page: number;
    perPage: number;
    total: number;
    results: Task[];
  }> {
    const result = await this.taskRepository.getTasks(userId, page, limit);

    return {
      page: result.page,
      perPage: result.perPage,
      total: result.total,
      results: result.results,
    };
  }

  async createTask(task: Task): Promise<Task> {
    return await this.taskRepository.createTask(task);
  }

  async deleteTask(id: number): Promise<void> {
    await this.taskRepository.deleteTask(id);
  }

  async updateTask(task: Task): Promise<Task> {
    return await this.taskRepository.updateTask(task);
  }
}
