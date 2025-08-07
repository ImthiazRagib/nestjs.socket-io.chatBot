import { Controller, Post, Body, Query } from '@nestjs/common';
import { ChatbotService } from './chat-bot.service';

@Controller('chatbot')
export class ChatbotController {
    constructor(private readonly chatbotService: ChatbotService) { }

    @Post('chat')
    async chat(@Query('user') user: {
        fullName: string;
        email: string;
        phone: number;
    }, @Body() message: string) {

        const reply = await this.chatbotService.getReplyByBot({
            ...user,
            message,
        });
        return { reply };
    }
}