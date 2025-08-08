import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FaqsModule } from './faqs/faqs.module';
import { ChatBotModule } from './chat-bot/chat-bot.module';
import { ChatBotGateway } from './gateway/chat-bot.gateway';

@Module({
  imports: [FaqsModule, ChatBotModule],
  controllers: [AppController],
  providers: [AppService, ChatBotGateway],
})
export class AppModule {}
