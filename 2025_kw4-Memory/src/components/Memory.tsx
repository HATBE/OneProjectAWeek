import { MouseEvent } from "react";
import MemoryItem from "./MemoryItem";
import { v4 as uuid } from "uuid";
import MemoryCard from "../MemoryCard";

type MemoryProps = {
  cardCount: number;
};

function shuffleArray<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export default function Memory({ cardCount }: MemoryProps) {
  let images = [
    "1.webp",
    "2.webp",
    "3.webp",
    "4.webp",
    "5.webp",
    "6.webp",
    "7.webp",
    "8.webp",
    "9.webp",
    "10.webp",
    "11.webp",
    "12.webp",
    "13.webp",
    "14.webp",
  ];

  images = shuffleArray(images);

  const col = Math.ceil(Math.sqrt(cardCount));

  let lastClicked: string | null = null;

  const style = {
    gridTemplateColumns: `repeat(${col}, 1fr)`,
  };

  let cards: MemoryCard[] = [];

  const lcards: MemoryCard[] = [];
  for (let i = 0; i < cardCount / 2; i++) {
    const selectedImage = images[0];
    images.shift();
    lcards.push(new MemoryCard(uuid(), selectedImage));
  }

  cards = [...lcards, ...lcards];

  cards = shuffleArray(cards);

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
