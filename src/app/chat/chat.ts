import { Component, computed, model, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [FormsModule],
  selector: 'app-chat',
  styleUrl: './chat.css',
  templateUrl: './chat.html',
})
export class Chat {
  name = model('');
  room = model('');
  message = model('');
  history = signal('');
  isActive = signal(false);

  canStart = computed(() => !!this.name().trim() && !!this.room().trim() && !this.isActive());

  onStart() {
    this.isActive.set(true);
  }

  onStop() {
    this.isActive.set(false);
  }

  onSend() {
    this.appendToHistory(this.message(), this.name());
    this.clear();
  }

  private clear() {
    this.message.set('');
  }

  private appendToHistory(message: string, sender: string) {
    this.history.update((history) => history + sender + ': ' + message + '\n');
  }
}
