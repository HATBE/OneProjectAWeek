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

  const style = {
    gridTemplateColumns: `repeat(${col}, 1fr)`,
  };

  const cards: MemoryCard[] = [];

  for (let i = 0; i < cardCount; i++) {
    cards.push(new MemoryCard(Math.ceil(Math.random() * 10) - 1));
  }

  return (
    <div className="grid" style={style}>
      {cards.map((card) => {
        return <MemoryItem card={card} />;
      })}
    </div>
  );
}
