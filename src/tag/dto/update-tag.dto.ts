import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateTagDto } from './create-tag.dto';
import { IsString } from 'class-validator';

export class UpdateTagDto extends PartialType(CreateTagDto) {
    @IsString()
    @ApiProperty()
    name: string;

    @IsString()
    @ApiProperty()
    colour: string;
}
