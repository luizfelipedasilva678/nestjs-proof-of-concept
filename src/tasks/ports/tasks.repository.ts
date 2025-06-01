import Task from '../tasks.entity';

interface TaskRepository {
  createTask(task: Task): Promise<Task>;
  getTask(id: string): Promise<Task | undefined>;
  getTasks(
    page?: number,
    limit?: number,
  ): Promise<{ page: number; perPage: number; total: number; results: Task[] }>;
}

export default TaskRepository;
