import { Routes } from '@angular/router';
import {PageNotFoundComponent} from './pages/page-not-found/page-not-found.component';
import { AuthGuard } from './gaurds/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import("../app/pages/home/home.component").then((m) => m.HomeComponent)
  }, {
  path: 'auth/login',
    loadComponent: () => import('../app/pages/auth/login/login.component').then((m) => m.LoginComponent)
  },
  {
    path: 'dashboard',
    loadComponent: () => import('../app/pages/dashboard/dashboard.component').then((m) => m.DashboardComponent),
    canActivate : [AuthGuard],
    children: [
      {
        path: '',
        loadComponent: () => import('../app/pages/dashboard/home/home.component').then((m) => m.HomeComponent)
      },
      {
        path: 'users',
        loadComponent: () => import('../app/pages/dashboard/users/users.component').then((m) => m.UsersComponent)
      },
      {
        path: 'villages',
        loadComponent: () => import('../app/pages/dashboard/villages/villages.component').then((m) => m.VillagesComponent),
      },
      {
        path: 'villages/map-view/:id',
        loadComponent: () => import("../app/pages/dashboard/villages/village-map/village-map.component").then((m) => m.VillageMapComponent)
      }
    ]
  },
  {
    path: '**', component: PageNotFoundComponent
  }
];
