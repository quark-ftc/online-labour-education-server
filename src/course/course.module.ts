import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseController } from './course.controller';
import { CourseService } from './course.service';
import { Course } from './entities/course.entity';
@Module({
  imports: [
    TypeOrmModule.forFeature([Course]),
    // MulterModule.registerAsync({
    //   useFactory: async () => ({}),
    //   inject: [ConfigModule],
    // }),
  ],
  exports: [TypeOrmModule],
  controllers: [CourseController],
  providers: [CourseService],
})
export class CourseModule {}
