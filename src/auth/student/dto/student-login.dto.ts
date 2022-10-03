import { IsString, Length } from 'class-validator';

export class StudentLoginDto {
  @IsString()
  @Length(11, 11, { message: '使用电话号码作为用户名，必须为11个字符' })
  readonly username: string;
  @IsString()
  @Length(6, 20, { message: '有效密码长度6-20个字符' })
  readonly password: string;
}
