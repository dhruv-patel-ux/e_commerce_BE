import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Tag } from 'src/tag/entities/tag.entity';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/category/entities/category.entity';
import { Repository } from 'typeorm';
import * as fs from 'fs/promises';
import * as path from 'path';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    @InjectRepository(Tag)
    private tagRepository: Repository<Tag>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) { }
  async create(createProductDto: CreateProductDto) {
    try {
      if (!createProductDto.name || !createProductDto.category || !createProductDto.image || !createProductDto.price || !createProductDto.tag) {
        throw new HttpException("All fields are required [name, category, image, proce, tag]", HttpStatus.BAD_REQUEST);
      }
      const tag = await this.tagRepository.findOne({ where: { id: +createProductDto.tag } })
      if (!tag) {
        throw new HttpException("Invalid Tag", HttpStatus.BAD_REQUEST);
      }
      const category = await this.categoryRepository.findOne({ where: { id: +createProductDto.category } })
      if (!category) {
        throw new HttpException("Invalid Category", HttpStatus.BAD_REQUEST);
      }
      const product = await this.productRepository.save({
        name: createProductDto.name,
        price: createProductDto.price,
        tag: +createProductDto.tag,
        category: +createProductDto.category,
        description: createProductDto.description,
        inStock: +createProductDto.inStock,
        image: createProductDto.image
      });
      if (product) {
        return {
          statusCode: 201,
          message: "Product Cretaed Successfully"
        }
      } else {
        throw new HttpException("Fail To Create Product", HttpStatus.BAD_REQUEST);
      }
    } catch (e) {
      console.log(e);

      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAll() {
    try {
      const product = await this.productRepository.query(`
        SELECT product.*,category.name AS categoryName,tag.name AS tagName,tag.colour AS tagColour FROM product 
        JOIN category ON category.id=product.category 
        JOIN tag ON tag.id= product.tag
        `);
      return {
        statusCode: 200,
        data: product
      }
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findOne(id: number) {
    try {
      if (!id) {
        throw new HttpException("Id Is required", HttpStatus.BAD_REQUEST);
      }
      const [product] = await this.productRepository.query(`
        SELECT product.*,category.name AS categoryName,tag.name AS tagName,tag.colour AS tagColour FROM product 
        JOIN category ON category.id=product.category 
        JOIN tag ON tag.id= product.tag
        WHERE product.id = ${id} 
        `);
      return {
        statusCode: 200,
        data: product
      }
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    if (!id) {
      throw new HttpException("Id is required", HttpStatus.BAD_REQUEST);
    }
    try {

      if (!updateProductDto.name || !updateProductDto.category || !updateProductDto.image || !updateProductDto.price || !updateProductDto.tag) {
        throw new HttpException("All fields are required [name, category, image, proce, tag]", HttpStatus.BAD_REQUEST);
      }
      const tag = await this.tagRepository.findOne({ where: { id: +updateProductDto.tag } })
      if (!tag) {
        throw new HttpException("Invalid Tag", HttpStatus.BAD_REQUEST);
      }
      const category = await this.categoryRepository.findOne({ where: { id: +updateProductDto.category } })
      if (!category) {
        throw new HttpException("Invalid Category", HttpStatus.BAD_REQUEST);
      }
      const product = await this.productRepository.update({ id }, {
        name: updateProductDto.name,
        price: updateProductDto.price,
        tag: +updateProductDto.tag,
        category: +updateProductDto.category,
        description: updateProductDto.description,
        inStock: +updateProductDto.inStock,
        image: updateProductDto.image
      });
      if (product) {
        return {
          statusCode: 201,
          message: "Product updated Successfully"
        }
      } else {
        throw new HttpException("Fail to update Product", HttpStatus.BAD_REQUEST);
      }
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async remove(id: number) {
    if (!id) {
      throw new HttpException("Id is required", HttpStatus.BAD_REQUEST);
    }
    const findProduct = await this.productRepository.findOne({ where: { id } });
    if (!findProduct) {
      throw new HttpException("Invalid Id", HttpStatus.BAD_REQUEST);
    }
    try {
      fs.unlink(process.cwd() + '/public' + findProduct.image)
    } catch (e) {
      console.log(e);
    }
    const product = await this.productRepository.delete({ id });
    if (product) {
      return {
        statusCode: 201,
        message: "Product Delete Successfully"
      }
    } else {
      throw new HttpException("Fail To Delete Product", HttpStatus.BAD_REQUEST);
    }
  }
}
