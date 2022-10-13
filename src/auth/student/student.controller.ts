import { Body, Controller, Post } from '@nestjs/common';
import { StudentRegisterDto } from './dto/student-register.dto';
import { StudentService } from './student.service';
import { StudentLoginDto } from './dto/student-login.dto';
@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}
  @Post('register')
  register(@Body() studentRegisterDto: StudentRegisterDto) {
    return this.studentService.studentRegister(studentRegisterDto);
  }

  @Post('login')
  login(@Body() studentLoginDto: StudentLoginDto) {
    return this.studentService.studentLogin(studentLoginDto);
  }
}
