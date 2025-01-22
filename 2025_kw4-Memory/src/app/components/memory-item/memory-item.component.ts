import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MemoryCard } from '../../models/memory-card/memoryCard.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-memory-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './memory-item.component.html',
  styleUrl: './memory-item.component.css',
})
export class MemoryItemComponent {
  @Input() card!: MemoryCard;
  @Output() clickEvent = new EventEmitter<MemoryCard>();

  protected visible = false;

  protected onClick() {
    this.visible = true;
    this.clickEvent.emit(this.card);
  }
}
