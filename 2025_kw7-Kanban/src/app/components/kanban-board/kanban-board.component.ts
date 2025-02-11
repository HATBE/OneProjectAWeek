import { Component, Input, OnInit } from '@angular/core';
import { KanbanColumnComponent } from '../kanban-column/kanban-column.component';
import { KanbanService } from '../../services/kanban.service';
import { Board } from '../../models/board.model';
import { CommonModule } from '@angular/common';
import { Column } from '../../models/column.model';

@Component({
  selector: 'app-kanban-board',
  standalone: true,
  imports: [KanbanColumnComponent, CommonModule],
  templateUrl: './kanban-board.component.html',
  styleUrl: './kanban-board.component.css',
})
export class KanbanBoardComponent implements OnInit {
  @Input() board!: Board;
  protected columns: Column[] | null = null;

  public constructor(private kanbanService: KanbanService) {}

  public ngOnInit(): void {
    this.columns = this.kanbanService.getAllColumnsByBoardId(this.board.id);
  }
}
