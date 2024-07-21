import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { TagService } from './tag.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { RoleGuard } from 'src/auth/roles.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Tag')
@ApiBearerAuth()
@Controller('tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Post()
  @UseGuards(AuthGuard,RoleGuard)
  create(@Body() createTagDto: CreateTagDto) {
    return this.tagService.create(createTagDto);
  }

  @Get()
  @UseGuards(AuthGuard,RoleGuard)
  findAll() {
    return this.tagService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard,RoleGuard)
  findOne(@Param('id') id: string) {
    return this.tagService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard,RoleGuard)
  update(@Param('id') id: string, @Body() updateTagDto: UpdateTagDto) {
    console.log(id,updateTagDto);
    
    return this.tagService.update(+id, updateTagDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard,RoleGuard)
  remove(@Param('id') id: string) {
    return this.tagService.remove(+id);
  }
}
