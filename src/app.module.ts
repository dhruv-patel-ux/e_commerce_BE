import { DynamicModule, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { UsersModule } from './users/users.module';
import { Users } from './users/entities/user.entity';
import { AuthModule } from './auth/auth.module';
import { Roles } from './auth/entity/roles.entity';
import { PasswordService } from './common/encryption.service';
import { JwtModule } from '@nestjs/jwt';
import { CategoryModule } from './category/category.module';
import { Category } from './category/entities/category.entity';
import { TagModule } from './tag/tag.module';
import { Tag } from './tag/entities/tag.entity';
import { ProductModule } from './product/product.module';
import { Product } from './product/entities/product.entity';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { PaymentGatwaysModule } from './payment-gatways/payment-gatways.module';
import { TransectionHistory } from './payment-gatways/entity/transectionHistory.entity';
import { CartModule } from './cart/cart.module';
import { Cart } from './cart/entities/cart.entity';
import { OrderItem } from './payment-gatways/entity/order-item.entity';
import { Orders } from './payment-gatways/entity/order.entity';
import { ReviewModule } from './review/review.module';
import { Review } from './review/entities/review.entity';
import { RedisModule } from './common/redis.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
     rootPath: join(__dirname, '..', 'public'),
    }),
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'dk-group.cp8iqsysyjw6.ap-south-1.rds.amazonaws.com',
      port: 3306,
      username: 'DKGROUP',
      password: 'DkGroup2002',
      database: 'dk-group',
      entities: [Users, Roles, Category, Tag, Product, TransectionHistory, Cart, OrderItem, Orders, Review],
      synchronize: true,
    }),
    // RedisModule,
    UsersModule,
    AuthModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET || '00E-COMMERCE$$',
      signOptions: { expiresIn: '1day' },
    }),
    CategoryModule,
    TagModule,
    ProductModule,
    PaymentGatwaysModule,
    CartModule,
    ReviewModule,
  ],
  controllers: [AppController],
  providers: [AppService, PasswordService],
  exports: [PasswordService]
})
export class AppModule { }
