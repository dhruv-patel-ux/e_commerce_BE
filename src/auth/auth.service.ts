import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PasswordService } from 'src/common/encryption.service';
import { Users } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { Roles } from './entity/roles.entity';
import { JwtService } from '@nestjs/jwt';
import { Product } from 'src/product/entities/product.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
    @InjectRepository(Product)
    private ProductRepository: Repository<Product>,
    private passwordService: PasswordService,
    private jwtService: JwtService
  ) { }
  async login(createAuthDto: CreateAuthDto) {
    if (!createAuthDto.email || !createAuthDto.password) {
      throw new HttpException('All Fields are required [email, password]', HttpStatus.BAD_REQUEST);
    };
    const [user] = await this.usersRepository.query(`
      SELECT user.*, role.role
      FROM users user
      INNER JOIN roles role ON user.roleId = role.id
      WHERE user.email = '${createAuthDto.email}'
    `);
    if (!user) {
      throw new HttpException('Invalid email', HttpStatus.BAD_REQUEST);
    }
    const password = await this.passwordService.compare(createAuthDto.password, user.password);
    if (!password) {
      throw new HttpException('Invalid Password', HttpStatus.BAD_REQUEST);
    }
    delete user.password;
    const accessToken = await this.jwtSign(user?.id);
    return {
      statusCode: 200,
      data: user,
      accessToken
    }
  }
  async dashboard() {
    try {

      const [count] = await this.usersRepository.query(`
        SELECT 
    COUNT(DISTINCT users.id) AS users,
    COUNT(transection_history.id) AS orders,
    SUM(transection_history.price) AS revenue
FROM 
    users 
JOIN 
    transection_history ON users.id = transection_history.userId 
        `);
      const product = await this.ProductRepository.count();
      return {
        data: { product, ...count }
      }
    } catch (e) {
      console.log(e);
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
  async jwtSign(id: any) {
    const payload = { id }
    return await this.jwtService.signAsync(payload);
  }
  async jwtVerify(token: any) {
    const payload = await this.jwtService.verifyAsync(
      token,
      {
        secret: process.env.JWT_SECRET
      }
    );
    return payload
  }
}
