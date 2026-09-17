import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/chat', pathMatch: 'full' },
  {
    path: 'chat',
    loadComponent: () => import('./chat/component/chat.component').then((m) => m.ChatComponent),
  },
];
