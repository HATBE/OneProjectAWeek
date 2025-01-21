import { MouseEvent } from "react";
import MemoryItem from "./MemoryItem";

type MemoryProps = {
  cardCount: number;
};

export class MemoryCard {
  private id: number;

  constructor(id: number) {
    this.id = id;
  }

  public getId() {
    return this.id;
  }
}

export default function Memory({ cardCount }: MemoryProps) {
  const col = Math.ceil(Math.sqrt(cardCount));

  let lastClicked: number | null = null;

  const style = {
    gridTemplateColumns: `repeat(${col}, 1fr)`,
  };

  let cards: MemoryCard[] = [];

  const lcards: MemoryCard[] = [];
  for (let i = 0; i < cardCount / 2; i++) {
    const number = Math.floor(1000000000 + Math.random() * 9000000000);

    lcards.push(new MemoryCard(number));
  }

  cards = [...lcards, ...lcards];

  const clickHandler = (e: MouseEvent) => {
    const id = parseInt((e.currentTarget as HTMLElement).dataset.id ?? "");

    if (lastClicked === id) {
      lastClicked = null;
      alert("match");
      return;
    }

    lastClicked = id;
  };

  return (
    <div className="grid" style={style}>
      {cards.map((card) => {
        return (
          <div data-id={card.getId()} onClick={clickHandler}>
            <MemoryItem card={card} />
          </div>
        );
      })}
    </div>
  );
}
