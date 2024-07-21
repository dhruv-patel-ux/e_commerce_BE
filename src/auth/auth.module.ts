import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Roles } from './entity/roles.entity';
import { Users } from '../users/entities/user.entity';
import { PasswordService } from 'src/common/encryption.service';
import { Product } from 'src/product/entities/product.entity';
import { TransectionHistory } from 'src/payment-gatways/entity/transectionHistory.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Roles,Users,Product,TransectionHistory])
  ],
  controllers: [AuthController],
  providers: [AuthService,PasswordService],
  exports:[AuthService]
})
export class AuthModule {}
