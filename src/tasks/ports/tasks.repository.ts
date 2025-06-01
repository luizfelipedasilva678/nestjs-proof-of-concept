import Task from '../tasks.entity';

interface TaskRepository {
  createTask(task: Task): Promise<Task>;
  getTask(id: number): Promise<Task | undefined>;
  getTasks(
    page?: number,
    limit?: number,
  ): Promise<{ page: number; perPage: number; total: number; results: Task[] }>;
  deleteTask(id: number): Promise<void>;
  updateTask(task: Task): Promise<Task>;
}

export default TaskRepository;
