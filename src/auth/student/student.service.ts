import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt/dist';
import { InjectRepository } from '@nestjs/typeorm';
import { hash, verify } from 'argon2';
import { Repository } from 'typeorm';
import { StudentLoginDto } from './dto/student-login.dto';
import { StudentRegisterDto } from './dto/student-register.dto';
import { Student } from './entity/student.entity';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
    private readonly jwtService: JwtService,
  ) {}


  async studentRegister(studentRegisterDto: StudentRegisterDto) {
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
        code: '200',
        message: ['Register Successfully'],
        token: await this.jwtService.signAsync({
          username: studentRegisterDto.username,
        }),
      };
    } else {
      return {
        statusCode: '400',
        message: [
          'The username(your telephone number) has already been registered',
        ],
      };
    }
  }

  async studentLogin(studentLoginDto: StudentLoginDto) {
    const studentList = await this.studentRepository.find({
      select: ['username', 'password'],
      where: { username: `${studentLoginDto.username}` },
    });

    if (studentList.length === 0) {
      return {
        statusCode: '400',
        message: ['the username has not been registered'],
      };
    } else if (
      !(await verify(studentList[0].password, studentLoginDto.password)) //库函数，验证密码
    ) {
      return {
        statusCode: '400',
        message: ['You password is wrong!'],
      };
    } else {
      return {
        statusCode: '200',
        message: ['Login successful'],
        token: await this.jwtService.signAsync({
          username: studentLoginDto.username,
        }),
      };
    }
  }
}
