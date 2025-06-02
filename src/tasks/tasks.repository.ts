import { Inject, Injectable } from '@nestjs/common';
import TaskRepository from './ports/tasks.repository';
import Task from './tasks.entity';
import { Knex } from 'knex';

@Injectable()
class TaskRepositoryInRDB implements TaskRepository {
  private tasks: Task[] = [];

  constructor(@Inject('CONNECTION') private readonly connection: Knex) {}

  async createTask(task: Task): Promise<Task> {
    this.tasks.push(task);

    task.setId(this.tasks.length);

    return Promise.resolve(task);
  }

  async getTask(id: number): Promise<Task | undefined> {
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

  async deleteTask(id: number): Promise<void> {
    if ((await this.getTask(id)) === undefined) {
      throw new Error('Task not found');
    }

    this.tasks = this.tasks.filter((task) => task.getId() !== Number(id));

    return Promise.resolve();
  }

  async updateTask(t: Task): Promise<Task> {
    const task = await this.getTask(t.getId());

    if (!task) {
      throw new Error('Task not found');
    }

    task.setDescription(t.getDescription());
    task.setTitle(t.getTitle());
    task.setIsDone(t.getIsDone());

    return Promise.resolve(task);
  }
}

export default TaskRepositoryInRDB;
