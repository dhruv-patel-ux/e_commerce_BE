import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) { }
  async create(createCategoryDto: CreateCategoryDto) {
    if (!createCategoryDto.name) {
      throw new HttpException("Category Name Is Required", HttpStatus.BAD_REQUEST);
    }
    try {
      const category = await this.categoryRepository.save(createCategoryDto)
      if (category) {
        return {
          statusCode: 201,
          message: "Category Created Successfully!"
        }
      } else {
        throw new HttpException("Fail to create category!", HttpStatus.BAD_REQUEST);
      }
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAll() {
    try {
      const category = await this.categoryRepository.find();
      return { statusCode: 200, data: category };
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOne(id: number) {
    try {
      if (!id) {
        throw new HttpException('Id Required', HttpStatus.BAD_REQUEST);
      }
      const category = await this.categoryRepository.findOne({ where: { id } });
      return { statusCode: 200, data: category };
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    try {
      if (!id) {
        throw new HttpException('Id is required', HttpStatus.BAD_REQUEST);
      }
      const category = await this.categoryRepository.update({ id }, updateCategoryDto);
      if (category) {
        return { statusCode: 200, message: "Category Updated!" };
      } else {
        throw new HttpException('Failt to update category', HttpStatus.BAD_REQUEST);
      }
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async remove(id: number) {
    try {
      if (!id) {
        throw new HttpException('Id is required', HttpStatus.BAD_REQUEST);
      }
      const category = await this.categoryRepository.delete({ id });
      if (category) {
        return { statusCode: 200, message: "Category Deleted!" };
      } else {
        throw new HttpException('Failt to delete category', HttpStatus.BAD_REQUEST);
      }
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
