import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail} from 'class-validator';
export class CreateUserDto {
    @IsString()
    @ApiProperty()
    firstname: string;
    
    @IsString()
    @ApiProperty()
    lastname: string;

    @IsEmail()
    @ApiProperty()
    email: string;

    @IsString()
    @ApiProperty()
    password: string;
    
    @IsString()
    @ApiProperty()
    phone: string;
}
