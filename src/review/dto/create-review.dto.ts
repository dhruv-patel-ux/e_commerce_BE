import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateReviewDto {
    @IsString()
    @ApiProperty()
    rating: string;

    @IsString()
    @ApiProperty()
    comment: string;

    @IsString()
    @ApiProperty()
    orderID: string;
}
