import { Service } from '@angular/core';
import { Subject } from 'rxjs';

import { ChatMessage } from '../chat.type';
import { environment } from '../../../environments/environment';

@Service()
export class ChatService {
  private readonly wsUri = environment.wsUri;
  private _messageStream$!: Subject<ChatMessage>;
  private webSocket?: WebSocket;

  connect(room: string) {
    this._messageStream$ = new Subject<ChatMessage>();
    this.webSocket = new WebSocket(`${this.wsUri}?room=${room}`);
    this.webSocket.onopen = () => {
      this.emit({ sender: room, message: 'Connected' });
    };
    this.webSocket.onclose = () => {
      this.emit({ sender: room, message: 'Disconnected' });
    };
    this.webSocket.onmessage = (event) => {
      const message: ChatMessage = JSON.parse(event.data);
      this.emit(message);
    };
  }

  send(message: ChatMessage) {
    this.webSocket?.send(JSON.stringify(message));
  }

  messageStream$() {
    return this._messageStream$?.asObservable();
  }

  close() {
    this.webSocket?.close();
    this._messageStream$.complete();
  }

  private emit(message: ChatMessage) {
    this._messageStream$?.next(message);
  }
}
