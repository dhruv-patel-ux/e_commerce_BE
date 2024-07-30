import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, HttpException, HttpStatus, UploadedFile, UseInterceptors } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { RoleGuard } from 'src/auth/roles.guard';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import * as fs from 'fs/promises';
import * as path from 'path';

@ApiTags('Category')
@ApiBearerAuth()
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) { }

  @Post()

  @UseInterceptors(FileInterceptor('image'))
  @ApiConsumes('multipart/form-data')
  @UseGuards(AuthGuard, RoleGuard)
  async create(@UploadedFile() file: any, @Body() createCategoryDto: CreateCategoryDto) {
    if (!file) {
      throw new HttpException("Please Provide Image", HttpStatus.BAD_REQUEST);
    }

    const { originalname, buffer } = file;
    const dirPath = path.join(process.cwd(), 'public', 'category');
    const fileName = `${Date.now()}-${originalname}`;
    const filePath = path.join(dirPath, fileName);

    try {
      await fs.access(dirPath);
    } catch {
      await fs.mkdir(dirPath, { recursive: true });
    }

    await fs.writeFile(filePath, buffer);

    createCategoryDto.image = `/category/${fileName}`;
    return this.categoryService.create(createCategoryDto);
  }

  @Get()
  findAll() {
    return this.categoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoryService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard, RoleGuard)
  update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoryService.update(+id, updateCategoryDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard, RoleGuard)
  remove(@Param('id') id: string) {
    return this.categoryService.remove(+id);
  }
}
