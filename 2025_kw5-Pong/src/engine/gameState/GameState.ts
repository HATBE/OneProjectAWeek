export default interface GameState {
  tick(): void;
  draw(): void;
  stop(): void;
  start(): void;

  keyboardEvents(keysPressed: string[]): void;
}
