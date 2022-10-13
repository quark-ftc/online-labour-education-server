import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      // disableErrorMessages: true, #在生产环境中开启

      /**
       * 启用白名单，请求负载中出现非白名单上的字段（类验证中没有修饰符的字段）时，
       * 返回错误
       */
      whitelist: true,
      forbidNonWhitelisted: true,
      /**
       * 自动将请求负载由普通的JavaScript对象转换为相应的DTO类型
       */
      transform: true,
    }),
  );
  app.enableCors({ origin: true }); //跨域支持
  await app.listen(3000);
}
bootstrap();
