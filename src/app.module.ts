import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FaqsModule } from './faqs/faqs.module';
import { ChatBotModule } from './chat-bot/chat-bot.module';
import { ChatBotGateway } from './gateway/chat-bot.gateway';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import databaseConfig from './config/database.config';
import { BotChats } from './models/chatbot.model';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig],
    }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        dialect: 'postgres',
        host: configService.get('database.host')!,
        port: parseInt(configService.get('database.port')!, 10),
        username: configService.get('database.username')!,
        password: configService.get('database.password')!,
        database: configService.get('database.database')!,
        models: [BotChats],
        autoLoadModels: true,
        synchronize: configService.get('NODE_ENV') !== 'production', // Don't use in production
        define: {
          underscored: true,
          timestamps: true,
          // paranoid: true,
        },
      }),
      inject: [ConfigService],
    }),
    FaqsModule, ChatBotModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
