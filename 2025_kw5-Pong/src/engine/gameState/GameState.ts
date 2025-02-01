export default interface GameState {
  tick(): void;
  draw(): void;
  stop(): void;
  start(): void;
}
