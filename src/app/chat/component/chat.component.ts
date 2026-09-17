import {
  afterRenderEffect,
  Component,
  computed,
  DestroyRef,
  ElementRef,
  inject,
  model,
  signal,
  viewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ChatService } from '../service/chat.service';
import { ChatMessage } from '../chat.type';

@Component({
  imports: [FormsModule],
  providers: [ChatService],
  selector: 'app-chat',
  styleUrl: './chat.component.css',
  templateUrl: './chat.component.html',
})
export class ChatComponent {
  private readonly chatService = inject(ChatService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly historyDiv = viewChild<ElementRef<HTMLDivElement>>('history');

  name = model('');
  room = model('');
  message = model('');
  chatMessages = signal<ChatMessage[]>([]);
  isActive = signal(false);
  canStart = computed(() => !!this.name().trim() && !!this.room().trim() && !this.isActive());

  constructor() {
    afterRenderEffect(() => {
      this.chatMessages();
      const historyDiv = this.historyDiv();

      if (historyDiv) {
        historyDiv.nativeElement.scrollTop = historyDiv.nativeElement.scrollHeight;
      }
    });
  }

  onStart() {
    this.clearAll();
    this.isActive.set(true);
    this.chatService.connect(this.room());
    const sub = this.chatService.messageStream$().subscribe(this.onReceive.bind(this));
    this.destroyRef.onDestroy(() => sub.unsubscribe());
  }

  onStop() {
    this.isActive.set(false);
    this.clearAll();
    this.chatService.close();
  }

  onSend() {
    const message = this.message();
    const sender = this.name();
    const chatMessage: ChatMessage = { message, sender };
    this.clearMessage();
    this.chatService.send(chatMessage);
  }

  onReceive(chatMessage: ChatMessage) {
    this.addMessage(chatMessage);
  }

  color(s: string) {
    return `hsl(${ChatComponent.hash(s) % 360}, 100%, 50%)`;
  }

  /*
    Private methods
   */

  private clearAll() {
    this.clearMessage();
    this.clearChatMessages();
  }

  private clearMessage() {
    this.message.set('');
  }

  private clearChatMessages() {
    this.chatMessages.set([]);
  }

  private addMessage(chatMessage: ChatMessage) {
    this.chatMessages.update((history) => [...history, chatMessage]);
  }

  private static hash(s: string) {
    return s.split('').reduce(function (a, b) {
      a = (a << 5) - a + b.codePointAt(0)!;
      return a & a;
    }, 0);
  }
}
