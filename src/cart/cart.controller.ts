import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) { }

  @Post()
  @UseGuards(AuthGuard)
  create(@Body() createCartDto: CreateCartDto, @Req() request: any) {
    const { id } = request.user;
    const obj = Object.assign({ userId: id }, { ...createCartDto })
    return this.cartService.create(obj);
  }

  @Get()
  @UseGuards(AuthGuard)
  findAll(@Req() request: any) {
    const { id } = request.user
    return this.cartService.findAll(id);
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  findOne(@Param('id') id: string) {
    return this.cartService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  update(@Param('id') id: string, @Body() updateCartDto: UpdateCartDto) {
    return this.cartService.update(+id, updateCartDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  remove(@Param('id') id: string) {
    return this.cartService.remove(+id);
  }
}
