import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StudentRegisterDto } from './dto/student-register.dto';
import { Student } from './entity/student.entity';
import { hash, verify } from 'argon2';
import { JwtService } from '@nestjs/jwt/dist';
import { StudentLoginDto } from './dto/student-login.dto';
import { domainToASCII } from 'url';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
    private readonly jwtService: JwtService,
  ) {}
  async register(studentRegisterDto: StudentRegisterDto) {
    const studentList = await this.studentRepository.find({
      select: ['username'],
      where: { username: `${studentRegisterDto.username}` },
    });
    if (studentList.length === 0) {
      /**
       * 引入argon2库，对密码进行哈希加密
       */
      studentRegisterDto.password = await hash(studentRegisterDto.password);
      this.studentRepository.save(studentRegisterDto);
      return {
        code: 200,
        message: 'Register successfully',
        token: await this.jwtService.signAsync({
          username: studentRegisterDto.username,
        }),
      };
    } else {
      return {
        code: 403,
        message:
          'The username(your telephone number) has already been registered',
      };
    }
  }

  async login(studentLoginDto: StudentLoginDto) {
    const studentList = await this.studentRepository.find({
      select: ['username', 'password'],
      where: { username: `${studentLoginDto.username}` },
    });

    if (studentList.length === 0) {
      return {
        code: 403,
        message: 'the username has not been registered',
      };
    } else if (
      !(await verify(studentList[0].password, studentLoginDto.password)) //库函数，验证密码
    ) {
      return {
        code: 403,
        message: 'You password is wrong!',
      };
    } else {
      return {
        code: 200,
        message: 'Login successful',
        token: this.jwtService.signAsync({
          username: studentLoginDto.username,
        }),
      };
    }
  }
}
