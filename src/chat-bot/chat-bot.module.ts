import { Module } from '@nestjs/common';
import { ChatbotService } from './chat-bot.service';
import { ChatbotController } from './chat-bot.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { BotChats } from 'src/models/chatbot.model';
import { ChatBotGateway } from 'src/gateway/chat-bot.gateway';

@Module({
   imports: [SequelizeModule.forFeature([BotChats])], // ✅ Register BotChats for DI
  providers: [ChatbotService, ChatBotGateway],
  controllers: [ChatbotController],
  exports: [ChatbotService],
})
export class ChatBotModule { }
