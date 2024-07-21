import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateProductDto } from './create-product.dto';
import { IsNumber, IsString } from 'class-validator';

export class UpdateProductDto extends PartialType(CreateProductDto) {
    @IsString()
    @ApiProperty()
    name: string;

    @IsString()
    @ApiProperty()
    description: string;

    @IsNumber()
    @ApiProperty()
    price: number;

    
    @IsNumber()
    @ApiProperty()
    inStock: number;
    
    @IsNumber()
    @ApiProperty()
    category: string;

    @IsNumber()
    @ApiProperty()
    tag: string;

    @ApiProperty({ 
        type: 'string', 
        format: 'binary',
        required: false,
        description: 'Image file'
    })
    image?: any;
}
