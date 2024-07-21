import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class CreateProductDto {
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
