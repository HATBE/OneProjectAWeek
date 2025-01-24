import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
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

  @Input() activeCards!: MemoryCard[];
  @Input() foundCards!: MemoryCard[];

  protected visible = false;
  protected found = false;

  protected ngOnChanges(change: SimpleChanges) {
    if (this.foundCards.includes(this.card)) {
      this.visible = true;
      this.found = true;
      return;
    }
    if (!this.activeCards.includes(this.card)) {
      this.visible = false;
    } else {
      this.visible = true;
    }
  }

  protected onClick() {
    if (this.found || this.visible) {
      return;
    }
    this.visible = true;
    this.clickEvent.emit(this.card);
  }
}
