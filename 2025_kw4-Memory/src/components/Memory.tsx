import MemoryItem from "./MemoryItem";

type MemoryProps = {
  cardCount: number;
};

export default function Memory({ cardCount }: MemoryProps) {
  const row = Math.floor(Math.sqrt(cardCount));
  const col = Math.ceil(Math.sqrt(cardCount));

  const renderGridItems = () => {
    const grid = [];

    for (let r = 0; r < row; r++) {
      const columns = [];
      for (let c = 0; c < col; c++) {
        columns.push(
          <div className="card">
            <MemoryItem key={`col-${r}-${c}`} />
          </div>
        );
      }
      grid.push(
        <div key={`row-${r}`} className="row">
          {columns}
        </div>
      );
    }

    return grid;
  };

  return <div className="grid">{renderGridItems()}</div>;
}
