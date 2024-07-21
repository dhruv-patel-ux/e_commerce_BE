import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './entities/user.entity';
import { Not, Repository } from 'typeorm';
import { Roles } from '../auth/entity/roles.entity';
import { PasswordService } from '../common/encryption.service';
import { AuthService } from 'src/auth/auth.service';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
    @InjectRepository(Roles)
    private rolesRepository: Repository<Roles>,
    private passwordService: PasswordService,
    private authService: AuthService
  ) { }
  async create(createUserDto: CreateUserDto) {
    try {
      if (!createUserDto.email || !createUserDto.phone || !createUserDto.password || !createUserDto.firstname || !createUserDto.lastname) {
        throw new HttpException('All Fields are required [email, phone, password, firstname, lastname]', HttpStatus.BAD_REQUEST);
      }
      const email = await this.usersRepository.findOne({ where: { email: createUserDto.email } })
      if (email) {
        throw new HttpException('Email Already Exist', HttpStatus.BAD_REQUEST);
      }
      const phone = await this.usersRepository.findOne({ where: { phone: createUserDto.phone } })
      if (phone) {
        throw new HttpException('Phone Already Exist', HttpStatus.BAD_REQUEST);
      }
      const role = await this.rolesRepository.findOne({ where: { role: "User" } });
      const password = await this.passwordService.hash(createUserDto.password);
      createUserDto.password = password;
      const user = await this.usersRepository.save({ ...createUserDto, roleId: role?.id || 2 });
      if (user) {
        const accessToken = this.authService.jwtSign(user.id);
        return {
          statusCode: 201,
          accessToken,
          data: user,
          message: "User Created Successfully."
        }
      } else {
        throw new HttpException('Fail to create new user!', HttpStatus.BAD_REQUEST);
      }
    } catch (e) {
      console.log(e);
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAll() {
    try {
      const users = await this.usersRepository.query(`
        SELECT users.*,COUNT(transection_history.id) AS orders, SUM(transection_history.price) AS spent FROM users JOIN transection_history ON users.id = transection_history.userId WHERE NOT  status='pending' 
        `)
      return {
        statusCode: 200,
        data: users
      };
    } catch (e) {
      console.log(e);
      
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOne(id: number) {
    const [user] = await this.usersRepository.query(`
      SELECT user.*, role.role
      FROM users user
      INNER JOIN roles role ON user.roleId = role.id
      WHERE user.id = ${id}
    `);
    return { statusCode: 200, data: user }
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
