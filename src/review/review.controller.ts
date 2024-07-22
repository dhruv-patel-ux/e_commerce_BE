import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) { }

  @Post()
  @UseGuards(AuthGuard)
  create(@Body() createReviewDto: CreateReviewDto, @Req() request: any) {
    const { id } = request.user;
    return this.reviewService.create(createReviewDto, id);
  }

  @Get()
  @UseGuards(AuthGuard)
  findAll(@Req() request: any) {
    const { id } = request.user;
    return this.reviewService.findAll(id);
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  findOne(@Param('id') id: string) {
    return this.reviewService.findOne(+id);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  remove(@Param('id') id: string) {
    return this.reviewService.remove(+id);
  }
}
