import { Module } from '@nestjs/common';
import { ChatbotService } from './chat-bot.service';
import { ChatbotController } from './chat-bot.controller';

@Module({
  providers: [ChatbotService],
  controllers: [ChatbotController],
  exports: [ChatbotService],
})
export class ChatBotModule { }
