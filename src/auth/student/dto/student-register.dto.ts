import { IsOptional, IsString, Length } from 'class-validator';

export class StudentRegisterDto {
  @IsString()
  @Length(1, 20, { message: '学生姓名：1-20个字符' })
  @IsOptional()
  student_name: string;

  @IsString()
  @Length(11, 11, { message: '用手机号码作为用户名：必须为11个字符' })
  username: string;

  @IsString()
  @Length(6, 20, { message: '用户密码:6-20个字符' })
  password: string;

  @IsString()
  @Length(10, 10, { message: '学生学号:默认10个字符' })
  @IsOptional()
  student_id: string;

  @IsString()
  @Length(1, 1, { message: '用数字1-9表示年级:1个字符' })
  @IsOptional()
  grade: string;

  @IsString()
  @Length(10, 10, { message: '班级编号: 默认10个字符' })
  @IsOptional()
  class_id: string;

  @IsString()
  @Length(1, 20, { message: '昵称，1-20个字符' })
  @IsOptional()
  nickname: string;
}
