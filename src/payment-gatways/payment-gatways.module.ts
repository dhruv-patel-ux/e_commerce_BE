import { Module } from '@nestjs/common';
import { PaymentGatwaysService } from './payment-gatways.service';
import { PaymentGatwaysController } from './payment-gatways.controller';
import { TransectionHistory } from './entity/transectionHistory.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/users/users.module';
import { Cart } from 'src/cart/entities/cart.entity';
import { Users } from 'src/users/entities/user.entity';
import { Orders } from './entity/order.entity';
import { OrderItem } from './entity/order-item.entity';
import { Product } from 'src/product/entities/product.entity';

@Module({
  imports:[TypeOrmModule.forFeature([TransectionHistory,Cart, Users,Orders,OrderItem, Product]),AuthModule,UsersModule],
  controllers: [PaymentGatwaysController],
  providers: [PaymentGatwaysService],
})
export class PaymentGatwaysModule {}
