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

  protected moves: number = 0;

  private cardsCount = 20;
  private col: number;
  protected gridStyle;
  protected cards: MemoryCard[] = [];
  protected activeCards: MemoryCard[] = [];
  protected foundCards: MemoryCard[] = [];

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
      const cardId = uuid();
      lcards.push({ id: cardId, image: selectedImage });
      lcards.push({ id: cardId, image: selectedImage });
    }

    this.cards = this.shuffleArray(lcards);

    this.cards = this.cards.map((card, idx) => ({
      ...card,
      index: idx,
    }));
  }

  private shuffleArray<T>(array: T[]): T[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  protected clickHandler(card: MemoryCard) {
    this.manageCards(card);

    if (this.foundCards.length === this.cardsCount) {
      alert('Du hast gebonnen!');
    }
  }

  protected manageCards(card: MemoryCard) {
    this.moves++;
    if (this.activeCards.length < 1) {
      this.activeCards.push(card);
      return;
    }

    if (this.activeCards.length >= 2) {
      this.activeCards = [];
      this.activeCards.push(card);
      return;
    }

    // match case
    if (this.activeCards[this.activeCards.length - 1].id === card.id) {
      this.foundCards.push(this.activeCards[this.activeCards.length - 1]);
      this.foundCards.push(card);
      this.activeCards = [];
      return;
    }

    this.activeCards.push(card);
  }
}
