class Task {
  private id: number;
  private readonly title: string;
  private readonly description: string;
  private isDone: boolean;

  constructor(
    title: string,
    description: string,
    id: number = 0,
    isDone: boolean = false,
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.isDone = isDone;
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
}

export default Task;
