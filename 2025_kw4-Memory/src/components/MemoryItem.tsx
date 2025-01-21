import { MouseEvent } from "react";
import MemoryCard from "../MemoryCard";

type MemoryItemProps = {
  card: MemoryCard;
  clickHandler: (e: MouseEvent<HTMLDivElement>) => void;
};

export default function MemoryItem({ card, clickHandler }: MemoryItemProps) {
  const vis = false;

  return (
    <div onClick={clickHandler} className="card" data-id={card.getId()}>
      {!vis && (
        <img className="thumpnail" src={`/assets/${card.getImagePath()}`} />
      )}
      {vis && <div>VIS::::{card.getId()} </div>}
    </div>
  );
}
