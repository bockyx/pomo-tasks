import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/home/home').then((m) => m.Home),
  },
  {
    path: 'tasks',
    loadComponent: () => import('./features/tasks/tasks').then((m) => m.Tasks),
  },
  {
    path: 'settings',
    loadComponent: () => import('./features/settings/settings').then((m) => m.Settings),
  },
];
