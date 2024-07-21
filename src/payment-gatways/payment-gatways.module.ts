import { Module } from '@nestjs/common';
import { PaymentGatwaysService } from './payment-gatways.service';
import { PaymentGatwaysController } from './payment-gatways.controller';
import { TransectionHistory } from './entity/transectionHistory.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/users/users.module';
import { Cart } from 'src/cart/entities/cart.entity';

@Module({
  imports:[TypeOrmModule.forFeature([TransectionHistory,Cart]),AuthModule,UsersModule],
  controllers: [PaymentGatwaysController],
  providers: [PaymentGatwaysService],
})
export class PaymentGatwaysModule {}
