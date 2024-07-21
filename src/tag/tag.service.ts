import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { Tag } from './entities/tag.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(Tag)
    private tagRepository: Repository<Tag>,
  ) { }
  async create(createtagDto: CreateTagDto) {
    if (!createtagDto.name) {
      throw new HttpException("tag Name Is Required", HttpStatus.BAD_REQUEST);
    }
    try {
      const tag = await this.tagRepository.save(createtagDto)
      if (tag) {
        return {
          statusCode: 201,
          message: "tag Created Successfully!"
        }
      } else {
        throw new HttpException("Fail to create tag!", HttpStatus.BAD_REQUEST);
      }
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAll() {
    try {
      const tag = await this.tagRepository.find();
      return { statusCode: 200, data: tag };
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOne(id: number) {
    try {
      if (!id) {
        throw new HttpException('Id Required', HttpStatus.BAD_REQUEST);
      }
      const tag = await this.tagRepository.findOne({ where: { id } });
      return { statusCode: 200, data: tag };
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(id: number, updatetagDto: UpdateTagDto) {
    try {
      if (!id) {
        throw new HttpException('Id is required', HttpStatus.BAD_REQUEST);
      }
      const tag = await this.tagRepository.update({ id }, updatetagDto);
      if (tag) {
        return { statusCode: 200, message: "tag Updated!" };
      } else {
        throw new HttpException('Failt to update tag', HttpStatus.BAD_REQUEST);
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
      const tag = await this.tagRepository.delete({ id });
      if (tag) {
        return { statusCode: 200, message: "tag Deleted!" };
      } else {
        throw new HttpException('Failt to delete tag', HttpStatus.BAD_REQUEST);
      }
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
