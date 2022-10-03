import { Module } from '@nestjs/common';
import { TestService } from './test.service';
import { TestController } from './test.controller';
// import { StudentJwtSerategy } from '../auth/strategy/studentJwt.strategy';

@Module({
  providers: [TestService],
  controllers: [TestController],
})
export class TestModule {}
