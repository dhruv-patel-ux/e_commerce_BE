import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { Review } from './entities/review.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review)
    private reviewRepository: Repository<Review>,
  ) { }
  async create(createReviewDto: CreateReviewDto, id: any) {
    try {
      if (!createReviewDto.comment || !createReviewDto.rating) {
        throw new HttpException("Comment And Rating Is Required", HttpStatus.BAD_REQUEST);
      }
      const review = await this.reviewRepository.save({ ...createReviewDto, userId: id })
      if (review) {
        return { statusCode: 201, message: "Review Added!" };
      } else {
        throw new HttpException("Fail to add review!", HttpStatus.BAD_REQUEST);
      }

    } catch (e) {
      throw new HttpException(e.messages, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAll(id: any) {
    try {

      const review = await this.reviewRepository.query(`
        SELECT review.*, users.firstname AS username FROM review JOIN users ON users.id = review.userId WHERE review.userId=${id} 
        `)
      return { statusCode: 200, data: review }
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} review`;
  }


  remove(id: number) {
    return `This action removes a #${id} review`;
  }
}
