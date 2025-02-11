import { Component, Input, OnInit } from '@angular/core';
import { KanbanCardComponent } from '../kanban-card/kanban-card.component';
import { CommonModule } from '@angular/common';
import { Column } from '../../models/column.model';
import { Card } from '../../models/card.model';
import { KanbanService } from '../../services/kanban.service';

@Component({
  selector: 'app-kanban-column',
  standalone: true,
  imports: [KanbanCardComponent, CommonModule],
  templateUrl: './kanban-column.component.html',
  styleUrl: './kanban-column.component.css',
})
export class KanbanColumnComponent implements OnInit {
  @Input() column!: Column;
  protected cards: Card[] | null = null;

  public constructor(private kanbanService: KanbanService) {}

  public ngOnInit(): void {
    this.cards = this.kanbanService.getAllCardsByColumnId(this.column.id);
  }
}
