import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatbotDto } from './dto/chatbot.dto';
import { UseFilters, UsePipes, ValidationPipe } from '@nestjs/common';

import { InjectModel } from '@nestjs/sequelize';
import { BotChats } from 'src/models/chatbot.model';
import { WebSocketExceptionFilter } from './exceptions/ws-exception.filter';

@WebSocketGateway({
  cors: {
    origin: '*', // Adjust in production
  },
})
@UseFilters(new WebSocketExceptionFilter())

export class ChatBotGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(
    @InjectModel(BotChats)
    private readonly botChatsModel: typeof BotChats,
  ) { }

  afterInit(server: Server) {
    console.log('WebSocket initialized');
  }

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('bot_chat')
  @UsePipes(new ValidationPipe())
  async handleMessage(@MessageBody() payload: ChatbotDto, @ConnectedSocket() client: Socket) {
    const { fullName, email, phone, message } = payload;
    try {
      await this.botChatsModel.create({
        fullName,
        email,
        phone,
        message,
      });
    } catch (error) {
      console.error('Failed to create chat message:', error);
      throw new Error('Failed to save chat message');
    }

    const botResponse = await this.getBotReply(message);

    this.server.to(client.id).emit('bot_response', botResponse);
  }

  private async getBotReply(text: string): Promise<any> {
    const msg = text.toLowerCase();

    const responses = [
      {
        id: 'greeting_001',
        question: 'hello',
        answer: 'Hi there! How can I assist you?',
        alternativeQuestions: ['hi', 'hey', 'greetings'],
        tags: ['greeting', 'welcome'],
        category: 'general',
        confidence_threshold: 0.85,
        last_updated: '2024-03-15T00:00:00Z',
        author: 'support_team',
        approval_status: 'approved',
        usage_count: 0,
        satisfaction_rating: 0,
        follow_up_questions: [
          'What can I help you with today?',
          'Do you have any specific questions?'
        ]
      },
      {
        id: 'help_001',
        question: 'help',
        answer: 'I can help you with general queries!',
        alternativeQuestions: ['what can you do', 'assistance needed'],
        tags: ['help', 'assistance'],
        category: 'general',
        confidence_threshold: 0.85,
        last_updated: '2024-03-15T00:00:00Z',
        author: 'support_team',
        approval_status: 'approved',
        usage_count: 0,
        satisfaction_rating: 0,
        follow_up_questions: [
          'What specific help do you need?',
          'Would you like to know more about our services?'
        ]
      },
      {
        id: 'farewell_001',
        question: 'bye',
        answer: 'Goodbye! Have a great day!',
        alternativeQuestions: ['goodbye', 'see you', 'farewell'],
        tags: ['farewell', 'exit'],
        category: 'general',
        confidence_threshold: 0.85,
        last_updated: '2024-03-15T00:00:00Z',
        author: 'support_team',
        approval_status: 'approved',
        usage_count: 0,
        satisfaction_rating: 0,
        follow_up_questions: []
      },
      {
        id: 'thanks_001',
        question: 'thank you',
        answer: "You're welcome!",
        alternativeQuestions: ['thanks', 'appreciate it'],
        tags: ['gratitude'],
        category: 'general',
        confidence_threshold: 0.85,
        last_updated: '2024-03-15T00:00:00Z',
        author: 'support_team',
        approval_status: 'approved',
        usage_count: 0,
        satisfaction_rating: 0,
        follow_up_questions: [
          'Is there anything else I can help you with?'
        ]
      }
    ];

    for (const response of responses) {
      if (msg.includes(response.question) ||
        response.alternativeQuestions.some(q => msg.includes(q))) {
        return response;
      }
    }
    return "I'm not sure I understand. Try saying 'hello' or 'help'.";
  }
}
