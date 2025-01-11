type BannerProps = {
  cName: string;
  text: string;
  resetGame: () => void;
};

export default function Banner({ cName, text, resetGame }: BannerProps) {
  return (
    <div className={`banner ${cName}`}>
      <span>
        {text}{" "}
        <span className="link" onClick={resetGame}>
          Play again?
        </span>
      </span>
    </div>
  );
}
