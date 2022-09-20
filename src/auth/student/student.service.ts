import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StudentRegisterDto } from './dto/student-register.dto';
import { Student } from './entity/student.entity';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
  ) {}

  async register(studentRegisterDot: StudentRegisterDto) {
    const student = await this.studentRepository.find({
      select: ['username'],
      where: { username: `${studentRegisterDot.username}` },
    });
    console.log(student);
    if (student.length === 0) {
      this.studentRepository.save(studentRegisterDot);
      return {
        code: 200,
        message: 'Register successfully',
      };
    } else {
      return {
        code: 403,
        message:
          'The username(your telephone number) has already been registered',
      };
    }
  }
}
