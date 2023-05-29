import { Inject } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
// import { UserService } from '../user/user.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class SocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
  //   @Inject(UserService)
  //   private readonly service: UserService;

  @WebSocketServer()
  server: Server;

  private connectedClients: Map<string, Socket> = new Map<string, Socket>();

  handleConnection(client: Socket) {
    this.connectedClients.set(client.id, client);
  }

  async handleDisconnect(client: Socket) {
    try {
      console.log('Client disconnected:', client.id);
      //   const user = await this.service.findBySocketId(client.id);

      //   if (user.socketId !== client.id)
      //     await this.service.update(user.id, {
      //       activeSessions: user.allowedSessions - 1,
      //     });
      this.connectedClients.delete(client.id);
    } catch (err) {
      console.log(err.message);
    }
  }

  sendToClientById(clientId: string, event: string, data: any) {
    const client = this.connectedClients.get(clientId);
    if (client) {
      client.emit(event, data);
    }
  }

  @SubscribeMessage('status')
  on(clientId: string, callback: (...args: any[]) => void): void {
    const client = this.connectedClients.get(clientId);
    if (client) {
      client.on('status', callback);
    }
  }

  @SubscribeMessage('new-user')
  async handleData(client: Socket, data: any): Promise<void> {
    try {
      //   const user = await this.service.findByLogin(data.login);
      //   if (user.socketId !== client.id)
      //     await this.service.update(user.id, {
      //       socketId: client.id,
      //       activeSessions: user.allowedSessions + 1,
      //     });
    } catch (err) {
      console.log('Error on socket.getaway.ts, message:', err.message);
    }
  }
}
