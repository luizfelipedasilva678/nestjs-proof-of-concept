import Task from '../tasks.entity';

interface TaskRepository {
  createTask(task: Task): Promise<Task>;
}

export default TaskRepository;
