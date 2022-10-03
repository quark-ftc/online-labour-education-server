import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Repository } from 'typeorm';
import { Student } from '../student/entity/student.entity';

/**
 * 通过在控制器中添加@UseGuards(AuthGuard('studentJwtSerategyStudentJwtSerategy'))装饰器使用此策略，
 * 
 * 用法示例：
 * 
  @Controller('test')
  export class TestController {
  @UseGuards(AuthGuard('studentJwtSerategyStudentJwtSerategy'))
  @Post('token')
  testToken(@Request() request: any) {
    console.log('-----------------------');
    return request.user;
  }
}
 * 
 * 官方文档的示例用法显示，本策略的validate函数的返回值会作为一个名为 user的对象添加到request请求对象中，
 * 时候可以通过@Body()等装饰器使用本策略，尚需查证。
 *
 */
@Injectable()
export class StudentJwt extends PassportStrategy(Strategy, 'studentJwt') {
  constructor(
    configService: ConfigService,
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), //提供从请求中提取 JWT 的方法
      secretOrKey: configService.get('tokenSecretKey'), //token密钥
    });
  }

  async validate(studentPlayout: any) {
    // console.log(studentPlayout);
    const studentList = await this.studentRepository.find({
      select: [
        'account_id',
        'student_name',
        'username',
        'password',
        'student_id',
        'grade',
        'class_id',
      ],
      where: {
        username: `${studentPlayout.username}`,
      },
    });
    // console.log(studentList.length);
    if (studentList.length > 0) {
      // console.log(studentList[0]);
      return studentList[0];
    }
  }
}
