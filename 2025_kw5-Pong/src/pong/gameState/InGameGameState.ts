import AbstractGameState from "../../engine/gameState/AbstractGameState";
import GameStateManager from "../../engine/gameState/GameStateManager";

export default class InGameGameState extends AbstractGameState {
  private x: number = 0;
  private y: number = 0;

  stop(): void {}
  start(): void {}

  tick(): void {
    if (this.keysPressed.map((k) => k.toLocaleLowerCase()).includes("w")) {
      this.y--;
    }

    if (this.keysPressed.map((k) => k.toLocaleLowerCase()).includes("a")) {
      this.x--;
    }

    if (this.keysPressed.map((k) => k.toLocaleLowerCase()).includes("s")) {
      this.y++;
    }

    if (this.keysPressed.map((k) => k.toLocaleLowerCase()).includes("d")) {
      this.x++;
    }
  }

  draw(): void {
    const ctx = GameStateManager.getInstatnce().getRenderer().getContext();

    ctx.fillStyle = "red";

    ctx.fillRect(
      0,
      0,
      GameStateManager.getInstatnce().getRenderer().getWidth(),
      GameStateManager.getInstatnce().getRenderer().getHeight()
    );

    ctx.fillStyle = "black";

    ctx.fillRect(this.x, this.y, 10, 10);
  }

  public keyboardEvents(keysPressed: string[]) {
    this.keysPressed = keysPressed;
  }
}
