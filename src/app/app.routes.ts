import { Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'home',
    component: HomeComponent,
    title: 'Home',
  },
  {
    path: 'chat',
    loadComponent: () => import('./chat/component/chat.component').then((m) => m.ChatComponent),
    title: 'Chat',
  },
  {
    path: 'geo',
    loadComponent: () => import('./geo/component/geo.component').then((m) => m.GeoComponent),
    title: 'Geo',
  },
];
