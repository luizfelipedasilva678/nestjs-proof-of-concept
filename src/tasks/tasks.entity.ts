import User from 'src/users/users.entity';

class Task {
  private id: number;
  private title: string;
  private description: string;
  private isDone: boolean;
  private user: User;

  constructor(
    title: string,
    description: string,
    id: number = 0,
    isDone: boolean = false,
    user: User = new User(),
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.isDone = isDone;
    this.user = user;
  }

  public getId(): number {
    return this.id;
  }

  public getTitle(): string {
    return this.title;
  }

  public getDescription(): string {
    return this.description;
  }

  public getIsDone(): boolean {
    return this.isDone;
  }

  public setId(id: number): void {
    this.id = id;
  }

  public setIsDone(isDone: boolean): void {
    this.isDone = isDone;
  }

  public setTitle(title: string): void {
    this.title = title;
  }

  public setDescription(description: string): void {
    this.description = description;
  }

  public setUser(user: User): void {
    this.user = user;
  }

  public getUser(): User {
    return this.user;
  }
}

export default Task;
