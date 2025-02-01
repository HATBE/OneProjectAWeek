import GameState from "./GameState";

export default abstract class AbstractGameState implements GameState {
  protected keysPressed: String[] = [];
  abstract tick(): void;
  abstract draw(): void;
  abstract stop(): void;
  abstract start(): void;
  abstract keyboardEvents(keysPressed: string[]): void;
}
