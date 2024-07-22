import { Module } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';
import { Review } from './entities/review.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/users/users.module';

@Module({
   imports: [TypeOrmModule.forFeature([Review]), AuthModule, UsersModule],
  controllers: [ReviewController],
  providers: [ReviewService],
})
export class ReviewModule {}
