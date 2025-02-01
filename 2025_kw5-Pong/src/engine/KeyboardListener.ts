import GameStateManager from "./gameState/GameStateManager";

export default class KeyboardListener {
  private keysPressed: { name: string; pressed: boolean }[] = [];

  public constructor() {
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);

    document.addEventListener("keydown", this.handleKeyDown);
    document.addEventListener("keyup", this.handleKeyUp);
  }

  private handleKeyDown(e: KeyboardEvent) {
    const key = this.keysPressed.find((key) => key.name === e.key);

    if (!key) {
      return this.keysPressed.push({ name: e.key, pressed: true });
    }

    key.pressed = true;

    GameStateManager.getInstatnce().fireKeyBoardEvents(this.getKeysPressed());
  }

  private handleKeyUp(e: KeyboardEvent) {
    const key = this.keysPressed.find((key) => key.name === e.key);

    if (!key) {
      return this.keysPressed.push({ name: e.key, pressed: false });
    }

    key.pressed = false;

    GameStateManager.getInstatnce().fireKeyBoardEvents(this.getKeysPressed());
  }

  public getKeysPressed(): string[] {
    return this.keysPressed.filter((key) => key.pressed).map((key) => key.name);
  }
}
