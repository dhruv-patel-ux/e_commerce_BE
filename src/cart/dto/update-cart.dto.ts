import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateCartDto } from './create-cart.dto';
import { IsString } from 'class-validator';

export class UpdateCartDto extends PartialType(CreateCartDto) {
    @IsString()
    @ApiProperty()
    productId: string;

    @IsString()
    @ApiProperty()
    quantity: string;
}
