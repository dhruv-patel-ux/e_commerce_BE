import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, Query, UseGuards, Req } from '@nestjs/common';
import { PaymentGatwaysService } from './payment-gatways.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { RoleGuard } from 'src/auth/roles.guard';

@Controller('payment-gatways')
export class PaymentGatwaysController {
  constructor(private readonly paymentGatwaysService: PaymentGatwaysService) { }
  @Post('create-checkout-session')
  @UseGuards(AuthGuard)
  create(@Body() body: any, @Req() request: any) {
    if (!body.price || body.price <= 0) {
      throw new HttpException('Invalid price', HttpStatus.NOT_ACCEPTABLE);
    }
    const { id } = request.user;
    body.userId = id;
    return this.paymentGatwaysService.createCheckoutSession(body);
  }
  @Get('verify-checkout-session')
  @UseGuards(AuthGuard)
  verify(@Query('id') paymentId: any) {
    return this.paymentGatwaysService.verifySession(paymentId);
  }
  
  @Get('')
  @UseGuards(AuthGuard,RoleGuard)
  AllOrders() {
    return this.paymentGatwaysService.getAll();
  }
}
