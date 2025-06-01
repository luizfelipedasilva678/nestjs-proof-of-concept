import { Injectable } from '@nestjs/common';
import TaskRepository from './ports/tasks.repository';
import Task from './tasks.entity';

@Injectable()
class TaskRepositoryInMemory implements TaskRepository {
  private readonly tasks: Task[] = [];

  async createTask(task: Task): Promise<Task> {
    this.tasks.push(task);

    task.setId(this.tasks.length);

    return Promise.resolve(task);
  }

  async getTask(id: string): Promise<Task | undefined> {
    return Promise.resolve(
      this.tasks.find((task) => task.getId() === Number(id)),
    );
  }

  async getTasks(
    page: number = 1,
    limit: number = 10,
  ): Promise<{
    page: number;
    perPage: number;
    total: number;
    results: Task[];
  }> {
    const offset = (page - 1) * limit;

    const tasks = await Promise.resolve(
      this.tasks.slice(offset, limit + offset),
    );

    return {
      page,
      perPage: limit,
      total: this.tasks.length,
      results: tasks,
    };
  }
}

export default TaskRepositoryInMemory;
