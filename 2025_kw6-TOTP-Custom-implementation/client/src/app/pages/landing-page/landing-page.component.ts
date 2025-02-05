import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TokenListComponent } from '../../components/token-list/token-list.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [CommonModule, TokenListComponent, RouterModule],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css',
})
export class LandingPageComponent {}
