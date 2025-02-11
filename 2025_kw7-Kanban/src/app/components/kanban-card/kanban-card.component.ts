import { Component, Input } from '@angular/core';
import { Card } from '../../models/card.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-kanban-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './kanban-card.component.html',
  styleUrl: './kanban-card.component.css',
})
export class KanbanCardComponent {
  @Input() card!: Card;
}
