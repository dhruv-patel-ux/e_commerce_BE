import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, Query, UseGuards, Req } from '@nestjs/common';
import { PaymentGatwaysService } from './payment-gatways.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { RoleGuard } from 'src/auth/roles.guard';
import { CheckoutDto, UpdateStatusDTO } from './dto/checkout.dto';

@Controller('payment-gatways')
export class PaymentGatwaysController {
  constructor(private readonly paymentGatwaysService: PaymentGatwaysService) { }
  @Post('create-checkout-session')
  @UseGuards(AuthGuard)
  create(@Body() body: CheckoutDto, @Req() request: any) {
    const { id } = request.user;
    const data = Object.assign({ userId: id }, { ...body })
    return this.paymentGatwaysService.createCheckoutSession(data);
  }
  @Get('verify-checkout-session')
  @UseGuards(AuthGuard)
  verify(@Query('id') paymentId: any) {
    return this.paymentGatwaysService.verifySession(paymentId);
  }

  @Get('')
  @UseGuards(AuthGuard, RoleGuard)
  Alltransection() {
    return this.paymentGatwaysService.Alltransection();
  }
  @Get('get-orders')
  @UseGuards(AuthGuard, RoleGuard)
  AllOrders() {
    return this.paymentGatwaysService.getOrders();
  }
  @Get('get-my-orders')
  @UseGuards(AuthGuard, RoleGuard)
  GetMyOrders(@Req() request:any) {
    const {id} = request.user
    return this.paymentGatwaysService.getMyOrders(id);
  }
  @Patch('/:id')
  @UseGuards(AuthGuard, RoleGuard)
  updateOrders(@Param("id") id: string,@Body() body:UpdateStatusDTO) {

    return this.paymentGatwaysService.updateOrders(+id,body);
  }

}
