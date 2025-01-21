import { MouseEvent, useState } from "react";
import MemoryCard from "../MemoryCard";

type MemoryItemProps = {
  card: MemoryCard;
  clickHandler: (e: MouseEvent<HTMLDivElement>) => void;
};

export default function MemoryItem({ card, clickHandler }: MemoryItemProps) {
  const vis = false;

  return (
    <div onClick={clickHandler} className="card" data-id={card.getId()}>
      {!vis && <div>{card.getId()}</div>}
      {vis && <div>VIS::::{card.getId()} </div>}
    </div>
  );
}
