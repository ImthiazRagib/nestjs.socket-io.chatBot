import { Injectable, OnModuleInit } from '@nestjs/common';
import { io, Socket } from 'socket.io-client';

@Injectable()
export class ChatbotService {

    private socket: Socket;

    constructor() {
        console.log('ChatbotService constructor');
        this.socket = io('http://localhost:3000'); // Replace with your socket server address
    }
    
    onModuleInit() {
        console.log('ChatbotService MODULEINIT');
        this.socket.on('connect', () => {
            console.log('Connected to chat socket server');
        });

        this.socket.on('connect_error', (error) => {
            console.error('Connection error:', error);
            // Check if server is running and accessible
            console.log('Please ensure socket server is running at http://localhost:3001');
        });

        this.socket.on('disconnect', (reason) => {
            console.log('Disconnected from server:', reason);
            // Attempt to reconnect
            this.socket.connect();
        });

        this.socket.on('error', (error) => {
            console.error('Socket connection error:', error);
        });
    }


    async getReplyByBot(payload: {
        fullName: string;
        email: string;
        phone: number;
        message: string;
    }): Promise<string> {
        try {
            return await this.getBotReply(payload);
        } catch (error) {
            console.error('Chatbot socket error:', error);
            return 'Something went wrong. Please try again.';
        }
    }

    async getBotReply(payload: any): Promise<string> {
        console.log("🚀 ~ ChatbotService ~ getBotReply ~ payload:", payload)
        try {
            return new Promise((resolve, reject) => {
                this.socket.emit('bot_chat', {...payload}, (response) => {
                    if (response.error) {
                        reject(response.error);
                    } else {
                        resolve(response.reply || "Sorry, I didn't understand that.");
                    }
                });

                // Add timeout to prevent hanging
                setTimeout(() => {
                    reject('Request timed out');
                }, 5000);
            });
        } catch (error) {
            console.error('Chatbot socket error:', error);
            return 'Something went wrong. Please try again.';
        }
    }
}