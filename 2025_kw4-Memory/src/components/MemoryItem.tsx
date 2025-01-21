import { MemoryCard } from "./Memory";

type MemoryItemProps = {
  card: MemoryCard;
};

export default function MemoryItem({ card }: MemoryItemProps) {
  return <div className="card">{card.getId()}</div>;
}
