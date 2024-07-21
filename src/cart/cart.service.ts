import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { Cart } from './entities/cart.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CartService {
  constructor(

    @InjectRepository(Cart)
    private cartRepository: Repository<Cart>,
  ) { }
  async create(createCartDto: any) {
    if (!createCartDto.productId || !createCartDto.quantity || +createCartDto.quantity < 1) {
      throw new HttpException("Name and quantity are required!", HttpStatus.BAD_REQUEST);
    }
    const cart = await this.cartRepository.save(createCartDto)
    if (cart) {
      return { statusCode: 201, messgae: "Item Add To cart" };
    } else {
      throw new HttpException("Fail To add to cart!", HttpStatus.BAD_REQUEST);
    }
  }

  async findAll(userId: any) {
    try {

      const cart = await this.cartRepository.query(`
        SELECT cart.*,product.name, product.price, product.image, category.name AS categoryname FROM cart JOIN product ON product.id= cart.productId JOIN category ON category.id = product.category WHERE cart.userId = ${userId}
        `);
      console.log(cart);

      return {
        statusCode: 200,
        data: cart
      }
    } catch (e) {
      console.log(e);

      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOne(id: number) {
    try {

      const [cart] = await this.cartRepository.query(`
        SELECT cart.*,product.name, product.price, product.image, category.name AS categoryname FROM cart JOIN product ON product.id= cart.productId JOIN category ON category.id = product.category WHERE cart.id = ${id}
        `);
      return {
        statusCode: 200,
        data: cart
      }
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(id: number, updateCartDto: UpdateCartDto) {
    if (!id) {
      throw new HttpException("Id Is Required", HttpStatus.BAD_REQUEST);
    }
    if (!updateCartDto.productId || !updateCartDto.quantity) {
      throw new HttpException("productID And quantity are Required", HttpStatus.BAD_REQUEST);
    }
    const cart = await this.cartRepository.update({ id }, { quantity: updateCartDto.quantity })
    if (!cart) {
      throw new HttpException("Fail to update Cart", HttpStatus.BAD_REQUEST);
    }
    return { statusCode: 201, messgae: "Cart Item Updated SuccessFully" };
  }

  async remove(id: number) {
    if (!id) {
      throw new HttpException("Id Is Required", HttpStatus.BAD_REQUEST);
    }

    const cart = await this.cartRepository.delete({ id })
    if (!cart) {
      throw new HttpException("Fail to delete Cart", HttpStatus.BAD_REQUEST);
    }
    return { statusCode: 201, messgae: "Cart Item deleted SuccessFully" };
  }
}
