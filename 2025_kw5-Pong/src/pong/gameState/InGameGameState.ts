import GameState from "../../engine/gameState/GameState";
import GameStateManager from "../../engine/gameState/GameStateManager";

export default class InGameGameState implements GameState {
  public constructor() {}

  stop(): void {}
  start(): void {}

  tick(): void {}

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

    ctx.font = "72px ARIAL";
    ctx.fillText("Welcome to ingame", 100, 100);
  }
}
