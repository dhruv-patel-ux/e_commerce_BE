import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail } from 'class-validator';
export class CreateCategoryDto {
    @IsString()
    @ApiProperty()
    name: string;

    @IsString()
    @ApiProperty()
    description: string;

    @ApiProperty({
        type: 'string',
        format: 'binary',
        required: false,
        description: 'Image file'
    })
    image?: any;
}


