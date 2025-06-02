import { Inject, Injectable } from '@nestjs/common';
import TaskRepository from './ports/tasks.repository';
import Task from './tasks.entity';
import { Knex } from 'knex';
import User from 'src/users/users.entity';

@Injectable()
class TaskRepositoryInRDB implements TaskRepository {
  private tasks: Task[] = [];

  constructor(@Inject('CONNECTION') private readonly connection: Knex) {}

  async createTask(task: Task): Promise<Task> {
    const result = await this.connection('tasks').insert({
      title: task.getTitle(),
      description: task.getDescription(),
      is_done: task.getIsDone(),
      user_id: task.getUser().id,
    });

    task.setId(result[0]);

    return task;
  }

  async getTask(id: number): Promise<Task | undefined> {
    const result = await this.connection('tasks').where('id', id);

    if (result.length > 0) {
      const data = result[0] as {
        id: number;
        title: string;
        description: string;
        is_done: boolean;
        user_id: number;
      };

      return new Task(
        data.title,
        data.description,
        data.id,
        data.is_done,
        new User('', '', '', data.user_id),
      );
    }

    return undefined;
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
    const offset = (page - 1) * limit;

    const r1 = await this.connection('tasks')
      .count('*')
      .where('user_id', userId);
    const r2 = await this.connection('tasks')
      .limit(limit)
      .offset(offset)
      .select('*')
      .where('user_id', userId);

    const total = r1[0] as { 'count(*)': number };
    const tasks = r2 as {
      id: number;
      title: string;
      description: string;
      is_done: number;
      user_id: number;
    }[];

    return {
      page,
      perPage: limit,
      total: total['count(*)'],
      results: tasks.map(
        (t) =>
          new Task(
            t.title,
            t.description,
            t.id,
            t.is_done === 0 ? false : true,
            new User('', '', '', t.user_id),
          ),
      ),
    };
  }

  async deleteTask(id: number): Promise<void> {
    await this.connection('tasks').where('id', id).delete();
  }

  async updateTask(t: Task): Promise<Task> {
    await this.connection('tasks').where('id', t.getId()).update({
      title: t.getTitle(),
      description: t.getDescription(),
      is_done: t.getIsDone(),
    });

    return t;
  }
}

export default TaskRepositoryInRDB;
