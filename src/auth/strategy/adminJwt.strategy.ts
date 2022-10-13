import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Repository } from 'typeorm';
import { Admin } from '../admin/entities/admin.entity';

@Injectable()
export class AdminJWT extends PassportStrategy(Strategy, 'asminJWT') {
  constructor(
    configService: ConfigService,
    @InjectRepository(Admin)
    private readonly adminRepository: Repository<Admin>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), //提供从请求中提取 JWT 的方法
      secretOrKey: configService.get('tokenSecretKey'), //token密钥
    });
  }

  async validate(adminPlayout: any) {
    // console.log(studentPlayout);
    const adminList = await this.adminRepository.find({
      select: ['account_id', 'nickname', 'password', 'username'],
      where: {
        username: `${adminPlayout.username}`,
      },
    });
    if (adminList.length > 0) {
      // console.log(studentList[0]);
      return adminList[0];
    }
  }
}
