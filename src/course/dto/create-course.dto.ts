import { Type } from 'class-transformer';
import { IsNumber, IsString, Length } from 'class-validator';
export class CreateCourseDto {
  @IsString()
  @Length(1, 50, { message: '课程标题：1-50个字符' })
  title: string;

  @IsString()
  @Length(1, 1000, { message: '课程表述：1-1000个字符' })
  description: string;

  @IsNumber()
  @Type(() => Number)
  price: number;

  @IsString()
  @Length(1, 100)
  url: string;

  @IsString()
  @Length(1, 100)
  preview: string;

  @IsString()
  @Length(1, 1)
  for_grade: string;
  
}
