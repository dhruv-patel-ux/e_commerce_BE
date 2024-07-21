import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateCartDto {
    
    @IsString()
    @ApiProperty()
    productId: string;

    @IsString()
    @ApiProperty()
    quantity: string;
}
