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
}

export default TaskRepositoryInMemory;
