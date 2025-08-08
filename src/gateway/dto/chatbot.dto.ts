import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Type } from 'class-transformer';


export class ChatbotDto {
    @IsString()
    @IsNotEmpty()
    fullName: string;

    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsNumber()
    @Type(() => Number) // 👈 transforms "1234" into 1234
    phone: number;

    @IsNotEmpty()
    @IsString()
    message: string;
}
