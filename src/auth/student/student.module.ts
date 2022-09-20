import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from './entity/student.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
@Module({
  imports: [
    TypeOrmModule.forFeature([Student]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          secret: configService.get('tokenSecretKey'),
          signOptions: { expiresIn: '1000d' },
        };
      },
    }),
  ],
  exports: [TypeOrmModule],
  providers: [StudentService],
  controllers: [StudentController],
})
export class StudentModule {}
