import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
        firstname: string;
        lastname: string;
        email: string;
        password: string;
        phone: string;
}
