import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import { v4 as uuidv4 } from 'uuid';
import { TransectionHistory } from './entity/transectionHistory.entity';
import { Not, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from 'src/cart/entities/cart.entity';
import { Orders } from './entity/order.entity';
import { OrderItem } from './entity/order-item.entity';
import { Users } from 'src/users/entities/user.entity';
import { Product } from 'src/product/entities/product.entity';
import { CheckoutDto } from './dto/checkout.dto';
@Injectable()
export class PaymentGatwaysService {
  private stripeClient: Stripe;

  public constructor(
    @InjectRepository(TransectionHistory)
    private transectionRepository: Repository<TransectionHistory>,
    @InjectRepository(Cart)
    private cartRepository: Repository<Cart>,
    @InjectRepository(Orders)
    private orderRepository: Repository<Orders>,
    @InjectRepository(OrderItem)
    private orderItemRepository: Repository<OrderItem>,
    @InjectRepository(Users)
    private userRepository: Repository<Users>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {
    this.stripeClient = new Stripe(
      process.env.STRIPE_SECRET || 'sk_test_51PeCmwBOql4w7Rm7pzcCcESKFkRkkZKmpo6rkX9YoszbMmAYXr7FZra76TzXZca1v4D2ze49uQgbZOrt9oUTDH5h00OIUwI3Yb',
      { apiVersion: '2020-08-27' },
    );
  }

  async createCheckoutSession(checkoutDto: any) {
    try {
      const user = await this.userRepository.findOne({ where: { id: checkoutDto.userId } });
      if (!user) {
        throw new HttpException('User Not Found', HttpStatus.INTERNAL_SERVER_ERROR);
      }
      const uuid = uuidv4()
      const order = new Orders();
      order.user = user;
      order.uuid = uuid;
      order.userId = user.id;
      order.shippingAddress = checkoutDto.shippingAddress;
      order.paymentMethod = 'stripe';
      order.status = 'pending'; // You can set an initial status

      const savedOrder = await this.orderRepository.save(order);

      let totalAmount = 0;

      for (const item of checkoutDto.cartItems) {
        const product = await this.productRepository.findOne({ where: { id: item.productId } });
        if (!product) {
          throw new HttpException('Product with id ${item.productId} not found', HttpStatus.INTERNAL_SERVER_ERROR);
        }

        const orderItem = new OrderItem();
        orderItem.orders = savedOrder;
        orderItem.orderId = savedOrder.id
        orderItem.product = product;
        orderItem.quantity = item.quantity;
        orderItem.price = item.price;

        await this.orderItemRepository.save(orderItem);

        totalAmount += item.quantity * item.price;

        // Update product inventory (optional)
        // product.stock -= item.quantity;
        // await queryRunner.manager.save(product);
      }

      savedOrder.totalAmount = totalAmount;
      await this.orderRepository.save(savedOrder);

      const saveTransection = {
        uuid,
        name: user.firstname,
        price: +totalAmount,
        quantity: 1,
        status: 'pending',
        sessionId: '',
        userId: +user.id,
      };
      await this.transectionRepository.save(saveTransection);
      const session = await this.stripeClient.checkout.sessions.create({
        mode: 'payment',
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: 'inr',
              product_data: {
                name: saveTransection.name,
              },
              unit_amount: +totalAmount * 100,
            },
            quantity: 1,
          },
        ],
        success_url: `http://localhost:4200/success?status=true&paymentId=${saveTransection.uuid}&type=stripe`,
        cancel_url:
          'http://localhost:4200/cancel?status=false&paymentId=&type=stripe',
      });
      await this.transectionRepository.update({ uuid: saveTransection.uuid }, { sessionId: session.id },
      );
      return { id: session.id };
    } catch (e) {
      console.log(e);
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  async verifySession(sessionId: any) {
    const transection = await this.transectionRepository.findOne({
      where: { uuid: sessionId, status: Not('complete') },
    });
    console.log(transection);

    if (transection) {
      const session = await this.stripeClient.checkout.sessions.retrieve(
        transection.sessionId,
      );
      if (session?.status == 'complete') {
        this.cartRepository.delete({})
        await this.transectionRepository.update({ uuid: sessionId }, { status: 'complete' }
        );
        return {
          status: true,
          message: 'Payment Successfully.',
        };
      } else {
        throw new HttpException('Payment Failed!', HttpStatus.BAD_REQUEST);
      }
    } else {
      throw new HttpException('Transection Not Found!', HttpStatus.BAD_REQUEST);
    }
  }
  async Alltransection() {
    try {
      const order = await this.transectionRepository.query(`
        SELECT transection_history.*, users.firstname AS username FROM transection_history JOIN users ON users.id = transection_history.userId ORDER BY ID DESC
         `)
      return {
        statusCode: 200,
        data: order
      }
    } catch (e) {
      console.log(e);
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }
  async getMyOrders(id: any) {
    try {
      const orders = await this.orderRepository.query(`
        SELECT * FROM orders WHERE userId=${id} ORDER BY id DESC`);
      for (let order of orders) {
        const item = await this.orderRepository.query(`
            SELECT order_item.*,product.name AS productName FROM order_item JOIN product ON product.id= order_item.productId WHERE orderId=${order.id}`);
        order['items'] = item
      }
      return {
        statusCode: 200,
        data: orders
      }
    } catch (e) {
      console.log(e);
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }
  async getOrders() {
    try {
      const orders = await this.orderRepository.query(`
        SELECT orders.*, users.firstname AS username FROM orders JOIN users ON users.id = orders.userId ORDER BY id DESC`);
      return {
        statusCode: 200,
        data: orders
      }
    } catch (e) {
      console.log(e);
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }
  async updateOrders(id: any, body: any) {
    try {
      if (!id || !body.status) {
        throw new HttpException('ID And Status Are Required!', HttpStatus.BAD_REQUEST);
      }
      const order = await this.orderRepository.update({ id }, { status: body.status });
      if (order) {
        return {
          statusCode: 201,
          message: "Status Updated!"
        }
      } else {
        throw new HttpException('Fail To update Status', HttpStatus.BAD_REQUEST);
      }
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }
}
