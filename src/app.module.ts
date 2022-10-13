import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentModule } from './auth/student/student.module';
import indexConfig from './config/index.config';
import { CourseModule } from './course/course.module';
import { TestModule } from './test/test.module'; //用于测试一些功能，生产环境中应该删除改模块
import { AdminModule } from './auth/admin/admin.module';

@Module({
  imports: [ 
    ConfigModule.forRoot({
      load: [...indexConfig],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => {
        const env = configService.get('env');
        if (env === 'local') {
          return configService.get('local.db');
        } else if (env === 'test') {
          return configService.get('test.db');
        } else if (env === 'production') {
          return configService.get('test.db');
        } else {
          throw Error('读取配置文件错误');
        }
      },
      inject: [ConfigService],
    }),
    StudentModule,
    TestModule, //用于测试一些功能，生产环境中应该删除改模块
    CourseModule,
    AdminModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
