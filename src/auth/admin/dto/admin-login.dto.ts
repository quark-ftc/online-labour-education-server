import { IsString, Length } from 'class-validator';
import {} from 'class-transformer';
export class AdminLoginDto {
  @IsString()
  @Length(11, 11, { message: '用手机号码作为用户名：必须为11个字符' })
  username: string;

  @IsString()
  @Length(6, 20, { message: '用户密码:6-20个字符' })
  password: string;
}
