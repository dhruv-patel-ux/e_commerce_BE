import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { Users } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PasswordService } from 'src/common/encryption.service';
import { AuthModule } from 'src/auth/auth.module';
import { Roles } from 'src/auth/entity/roles.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Users, Roles]),
    AuthModule
  ],
  controllers: [UsersController],
  providers: [UsersService, PasswordService, AuthModule],
  exports: [UsersService]
})
export class UsersModule { }
