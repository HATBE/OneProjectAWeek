import { Routes } from '@angular/router';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { CreateTokenPageComponent } from './pages/create-token-page/create-token-page.component';

export const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent,
    title: 'Home',
  },
  {
    path: 'add',
    component: CreateTokenPageComponent,
    title: 'Create token',
  },
  { path: '**', redirectTo: '/' },
];
