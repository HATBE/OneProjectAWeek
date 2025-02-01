import GameState from "./GameState";

export default abstract class AbstractGameState implements GameState {
  protected keysPressed: String[] = [];
  abstract tick(): void;
  abstract draw(): void;
  abstract stop(): void;
  abstract start(): void;

  protected isKeyPressed(key: string, ignoreCase: boolean = false) {
    let keys = this.keysPressed;
    if (ignoreCase) {
      keys = keys.map((k) => k.toLocaleLowerCase());
    }

    return keys.includes(key);
  }

  public keyboardEvents(keysPressed: string[]) {
    this.keysPressed = keysPressed;
  }
}
