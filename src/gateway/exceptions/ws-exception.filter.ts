import {
    ArgumentsHost,
    Catch,
    WsExceptionFilter,
    HttpException,
    Logger,
} from '@nestjs/common';
import { WsException } from '@nestjs/websockets';
import { Socket } from 'socket.io';

@Catch()
export class WebSocketExceptionFilter implements WsExceptionFilter {
    private readonly logger = new Logger(WebSocketExceptionFilter.name);

    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToWs();
        const client = ctx.getClient<Socket>();

        let errorResponse: any = {
            event: 'error',
            message: 'Unknown error occurred',
        };

        if (exception instanceof WsException) {
            errorResponse = {
                event: 'error',
                message: exception.getError(),
            };
        } else if (exception instanceof HttpException) {
            const response = exception.getResponse();
            errorResponse = {
                event: 'error',
                message:
                    typeof response === 'string'
                        ? response
                        : (response as any).message || 'HTTP error',
            };
        } else if (exception instanceof Error) {
            errorResponse = {
                event: 'error',
                message: exception.message,
            };
        }

        this.logger.error(
            `WS Error for client ${client.id}: ${errorResponse.message}`,
        );

        // Log the emission attempt
        this.logger.debug(`Attempting to emit exception to client ${client.id}`);

        // Check if client is connected
        if (client.connected) {
            client.emit('exception', errorResponse);
            this.logger.debug(`Successfully emitted exception to client ${client.id}`);
        } else {
            this.logger.error(`Failed to emit - client ${client.id} is not connected`);
        }
    }
}
