import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MemoryCard } from '../../models/memory-card/memoryCard.model';
import { v4 as uuid } from 'uuid';
import { MemoryItemComponent } from '../memory-item/memory-item.component';

@Component({
  selector: 'app-memory',
  standalone: true,
  imports: [CommonModule, MemoryItemComponent],
  templateUrl: './memory.component.html',
  styleUrl: './memory.component.css',
})
export class MemoryComponent {
  private images = [
    '1.webp',
    '2.webp',
    '3.webp',
    '4.webp',
    '5.webp',
    '6.webp',
    '7.webp',
    '8.webp',
    '9.webp',
    '10.webp',
    '11.webp',
    '12.webp',
    '13.webp',
    '14.webp',
  ];

  private cardsCount = 20;
  private col: number;
  protected gridStyle;
  protected cards: MemoryCard[] = [];
  private lastClickedCard: MemoryCard[] = [];

  public constructor() {
    this.images = this.shuffleArray(this.images);
    this.col = Math.ceil(Math.sqrt(this.cardsCount));

    this.gridStyle = {
      gridTemplateColumns: `repeat(${this.col}, 1fr)`,
    };

    const lcards: MemoryCard[] = [];
    for (let i = 0; i < this.cardsCount / 2; i++) {
      const selectedImage = this.images[0];
      this.images.shift();
      lcards.push({ id: uuid(), image: selectedImage });
    }

    this.cards = [...lcards, ...lcards];
    this.cards = this.shuffleArray(this.cards);
  }

  private shuffleArray<T>(array: T[]): T[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  protected clickHandler(card: MemoryCard) {
    if (this.lastClickedCard.length < 1) {
      this.lastClickedCard.push(card);
      return;
    }

    // match case
    if (this.lastClickedCard[this.lastClickedCard.length - 1].id === card.id) {
      this.lastClickedCard = [];
      alert('match');
      //TODO: remove cards from stack (empty them)
      return;
    }

    // close cards

    this.lastClickedCard.push(card);
  }
}
