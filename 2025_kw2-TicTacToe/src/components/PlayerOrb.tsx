type PlayerOrbProps = {
  text: string;
  cName?: string;
};

export default function PlayerOrb({ text, cName }: PlayerOrbProps) {
  return <span className={`player-orb ${cName}`}>{text}</span>;
}
