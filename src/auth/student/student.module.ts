import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from './entity/student.entity';
import { StudentController } from './student.controller';
import { StudentService } from './student.service';
import { StudentJwt } from '../strategy/studentJwt.strategy';
@Module({
  imports: [
    TypeOrmModule.forFeature([Student]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          secret: configService.get('tokenSecretKey'),
          signOptions: { expiresIn: '1000d' }, //token过期时间1000天
        };
      },
    }),
  ],
  exports: [TypeOrmModule],
  providers: [StudentService, StudentJwt],
  controllers: [StudentController],
})
export class StudentModule {}
