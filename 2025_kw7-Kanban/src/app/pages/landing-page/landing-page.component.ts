import { Component, OnInit } from '@angular/core';
import { KanbanBoardComponent } from '../../components/kanban-board/kanban-board.component';
import { Board } from '../../models/board.model';
import { KanbanService } from '../../services/kanban.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [KanbanBoardComponent, CommonModule],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css',
})
export class LandingPageComponent implements OnInit {
  protected board: Board | null = null;

  public constructor(private kanbanService: KanbanService) {}

  public ngOnInit(): void {
    this.board = this.kanbanService.getAllBoards()[0];
  }
}
