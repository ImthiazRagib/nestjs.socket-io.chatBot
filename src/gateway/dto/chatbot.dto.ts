import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class ChatbotDto {
    @IsString()
    @IsNotEmpty()
    fullName: string;

    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    phone: string;

    @IsNotEmpty()
    @IsString()
    message: string;
}
