import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { KanbanService } from './services/kanban.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, LandingPageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'kanban';

  constructor(private kanbanService: KanbanService) {}

  ngOnInit() {
    this.kanbanService.testData();
  }
}
