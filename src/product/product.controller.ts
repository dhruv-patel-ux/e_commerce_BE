import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors, UploadedFiles, UploadedFile, Req, HttpException, HttpStatus } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { RoleGuard } from 'src/auth/roles.guard';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import * as fs from 'fs/promises';
import * as path from 'path';

@ApiTags('Product')
// @ApiBearerAuth()
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  @ApiConsumes('multipart/form-data')
  @UseGuards(AuthGuard, RoleGuard)
  async create(@UploadedFile() file: any, @Body() createProductDto: CreateProductDto) {
    try {
      if (!file) {
        throw new HttpException("Please Provide Image", HttpStatus.BAD_REQUEST);
      }

      const { originalname, buffer } = file;
      const dirPath = path.join(process.cwd(), 'public', 'products');
      const fileName = `${Date.now()}-${originalname}`;
      const filePath = path.join(dirPath, fileName);

      try {
        await fs.access(dirPath);
      } catch {
        await fs.mkdir(dirPath, { recursive: true });
      }

      await fs.writeFile(filePath, buffer);

      createProductDto.image = `/products/${fileName}`;
      console.log(createProductDto);
      
      return await this.productService.create(createProductDto);
    } catch (error) {
      console.error('Error in product creation:', error);

      if (error instanceof HttpException) {
        throw error;
      }

      throw new HttpException(
        'An error occurred while creating the product',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }

  }

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('image'))
  @ApiConsumes('multipart/form-data')
  @UseGuards(AuthGuard, RoleGuard)
  async update(@UploadedFile() file: any, @Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    try {
      if (file) {
        const { originalname, buffer } = file;
        const dirPath = path.join(process.cwd(), 'public', 'products');
        const fileName = `${Date.now()}-${originalname}`;
        const filePath = path.join(dirPath, fileName);
        try {
          await fs.access(dirPath);
        } catch {
          await fs.mkdir(dirPath, { recursive: true });
        }
        await fs.writeFile(filePath, buffer);
        updateProductDto.image = `/products/${fileName}`;
      }
      console.log(updateProductDto);
      
      return await this.productService.update(+id, updateProductDto);
    } catch (error) {
      console.error('Error in product creation:', error);
      if (error instanceof HttpException) {
        throw error;
      }

      throw new HttpException(
        'An error occurred while creating the product',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
  @Delete(':id')
  @UseGuards(AuthGuard, RoleGuard)
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
}
