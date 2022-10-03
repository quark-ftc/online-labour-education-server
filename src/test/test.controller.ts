import { Controller, Post, Request } from '@nestjs/common';
import { UseGuards } from '@nestjs/common/decorators/core/use-guards.decorator';
import { AuthGuard } from '@nestjs/passport/dist';

@Controller('test')
export class TestController {
  @UseGuards(AuthGuard('studentJwt'))
  @Post('token')
  testToken(@Request() request: any) {
    // console.log('-----------------------');
    return request.user;
  }
}
