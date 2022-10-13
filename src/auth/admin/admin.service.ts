import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { hash, verify } from 'argon2';
import { Repository } from 'typeorm';
import { AdminLoginDto } from './dto/admin-login.dto';
import { AdminRegisterDto } from './dto/admin-register.dto';
import { Admin } from './entities/admin.entity';

@Injectable()
export class AdminService {
  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(Admin)
    private readonly adminRepository: Repository<Admin>,
    private readonly jwtService: JwtService,
  ) {}
  async adminRegister(adminRegisterDto: AdminRegisterDto) {
    if (
      adminRegisterDto.administratorAuthentication !==
      this.configService.get('administratorAuthentication')
    ) {
      return {
        statusCode: '400',
        message: [
          'You administrator authentication error,Please confirm you are a administrator',
        ],
      };
    }
    const adminList = await this.adminRepository.find({
      select: ['username'],
      where: { username: `${adminRegisterDto.username}` },
    });
    if (adminList.length !== 0) {
      return {
        statusCode: '400',
        message: [
          'The username(your telephone number) has already been registered',
        ],
      };
    } else {
      adminRegisterDto.password = await hash(adminRegisterDto.password);
      this.adminRepository.save(adminRegisterDto);
      return {
        statusCode: '200',
        message: ['Register Successfully'],
        token: await this.jwtService.signAsync({
          username: adminRegisterDto.username,
        }),
      };
    }
  }
  async adminLogin(adminLoginDto: AdminLoginDto) {
    // console.log(adminLoginDto.username);
    // console.log(adminLoginDto.password);
    const adminList = await this.adminRepository.find({
      select: ['username', 'password'],
      where: [{ username: `${adminLoginDto.username}` }],
    });
    if (adminList.length === 0) {
      return {
        statusCode: '400',
        message: ['the username has not been registered'],
      };
    } else if (!(await verify(adminList[0].password, adminLoginDto.password))) {
      return {
        code: '400',
        message: ['You password is wrong!'],
      };
    } else {
      return {
        statusCode: '200',
        message: ['Login successful'],
        token: await this.jwtService.signAsync({
          username: adminLoginDto.username,
        }),
      };
    }
  }
}
