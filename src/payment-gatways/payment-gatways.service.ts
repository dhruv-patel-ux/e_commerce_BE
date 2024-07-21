import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import { v4 as uuidv4 } from 'uuid';
import { TransectionHistory } from './entity/transectionHistory.entity';
import { Not, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from 'src/cart/entities/cart.entity';
@Injectable()
export class PaymentGatwaysService {
  private stripeClient: Stripe;

  public constructor(
    @InjectRepository(TransectionHistory)
    private transectionRepository: Repository<TransectionHistory>,
    @InjectRepository(Cart)
    private cartRepository: Repository<Cart>,
  ) {
    this.stripeClient = new Stripe(
      process.env.STRIPE_SECRET || 'sk_test_51PeCmwBOql4w7Rm7pzcCcESKFkRkkZKmpo6rkX9YoszbMmAYXr7FZra76TzXZca1v4D2ze49uQgbZOrt9oUTDH5h00OIUwI3Yb',
      { apiVersion: '2020-08-27' },
    );
  }

  async createCheckoutSession(body: any) {
    try {
      const saveTransection = {
        uuid: uuidv4(),
        name: body.name,
        price: +body.price,
        quantity: 1,
        status: 'pending',
        sessionId: '',
        userId: +body.userId,
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
                name: body.name,
              },
              unit_amount: +body.price * 100,
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
  async getAll() {
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
      
      throw new HttpException('Transection Not Found!', HttpStatus.BAD_REQUEST);
    }
  }
}
