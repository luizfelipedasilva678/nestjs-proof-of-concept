import Task from './tasks.entity';
import TaskDTO from './task.dto';

class TasksMapper {
  public static toTaskDTO(task: Task): TaskDTO {
    return {
      id: task.getId(),
      title: task.getTitle(),
      description: task.getDescription(),
      isDone: task.getIsDone(),
    };
  }

  public static toTask(taskDto: TaskDTO): Task {
    return new Task(
      taskDto.title,
      taskDto.description,
      taskDto.id,
      taskDto.isDone,
    );
  }
}

export default TasksMapper;
