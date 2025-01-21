import { MouseEvent } from "react";
import MemoryItem from "./MemoryItem";
import { v4 as uuid } from "uuid";
import MemoryCard from "../MemoryCard";

type MemoryProps = {
  cardCount: number;
};

export default function Memory({ cardCount }: MemoryProps) {
  const col = Math.ceil(Math.sqrt(cardCount));

  let lastClicked: string | null = null;

  const style = {
    gridTemplateColumns: `repeat(${col}, 1fr)`,
  };

  let cards: MemoryCard[] = [];

  const lcards: MemoryCard[] = [];
  for (let i = 0; i < cardCount / 2; i++) {
    lcards.push(new MemoryCard(uuid()));
  }

  cards = [...lcards, ...lcards];

  //TODO: shuffle

  const clickHandler = (e: MouseEvent<HTMLDivElement>) => {
    const id = e.currentTarget.dataset.id;

    if (!id) {
      return;
    }

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
        return <MemoryItem clickHandler={clickHandler} card={card} />;
      })}
    </div>
  );
}
