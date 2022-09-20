import { Body, Controller, Post } from '@nestjs/common';
import { StudentRegisterDto } from './dto/student-register.dto';
import { StudentService } from './student.service';
@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}
  @Post('register')
  login(@Body() studentRegisterDto: StudentRegisterDto) {
    return this.studentService.register(studentRegisterDto);
  }
}
