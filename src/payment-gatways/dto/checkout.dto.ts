export class CheckoutDto {
    shippingAddress: string;
    cartItems: {
      productId: number;
      quantity: number;
      price: number;
    }[];
  }

  export class UpdateStatusDTO {
    status:string
  }