import { Injectable } from '@angular/core';
import { Board } from '../models/board.model';
import { Column } from '../models/column.model';
import { Card } from '../models/card.model';
import { v4 as uuid } from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class KanbanService {
  private boards: Board[] = [];
  private columns: Column[] = [];
  private cards: Card[] = [];

  public getAllBoards() {
    return this.boards;
  }

  public getBoardById(boardId: string): Board | null {
    return this.boards.find((board) => board.id === boardId) || null;
  }

  public getAllColumnsByBoardId(boardId: string): Column[] | null {
    console.log(
      this.columns.filter((col) => {
        col.boardId !== boardId;
      })
    );
    return this.columns.filter((column) => column.boardId === boardId) || null;
  }

  public getAllCardsByColumnId(columnId: string): Card[] | null {
    return this.cards.filter((card) => card.columnId === columnId) || null;
  }

  public createBoard(name: string): Board {
    const board = { id: uuid(), name };
    this.boards.push(board);
    return board;
  }

  public createColumn(boardId: string, name: string): Column {
    const column = { id: uuid(), boardId, name };
    this.columns.push(column);
    return column;
  }

  public createCard(columnId: string, text: string): Card {
    const card = { id: uuid(), columnId, text };
    this.cards.push(card);
    return card;
  }

  public testData() {
    const board = this.createBoard('Board 1');

    const column1 = this.createColumn(board.id, 'Column 1');
    const column2 = this.createColumn(board.id, 'Column 2');
    const column3 = this.createColumn(board.id, 'Column 3');

    this.createCard(column1.id, 'Card 1');
    this.createCard(column1.id, 'Card 2');
    this.createCard(column1.id, 'Card 3');
    this.createCard(column1.id, 'Card 4');
    this.createCard(column1.id, 'Card 5');

    this.createCard(column2.id, 'Card 6');
    this.createCard(column2.id, 'Card 7');
    this.createCard(column2.id, 'Card 8');

    this.createCard(column3.id, 'Card 9');
  }
}
