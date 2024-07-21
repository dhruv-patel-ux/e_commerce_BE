import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { Product } from './entities/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/users/users.module';
import { TagModule } from 'src/tag/tag.module';
import { CategoryModule } from 'src/category/category.module';
import { Category } from 'src/category/entities/category.entity';
import { Tag } from 'src/tag/entities/tag.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product,Category,Tag]),
    AuthModule,
    UsersModule,
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule { }
