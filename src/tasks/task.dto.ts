import { Exclude } from 'class-transformer';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  Length,
  IsOptional,
} from 'class-validator';

export default class TaskDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @Length(5, 20)
  title: string;

  @IsNotEmpty()
  @Length(5)
  description: string;

  @IsNotEmpty()
  @IsBoolean()
  isDone: boolean;

  @IsOptional()
  @IsNumber()
  @Exclude({ toPlainOnly: true })
  userId: number;

  constructor(
    title: string,
    description: string,
    id: number = 0,
    isDone: boolean = false,
  ) {
    this.id = id;
    this.description = description;
    this.title = title;
    this.isDone = isDone;
  }
}
