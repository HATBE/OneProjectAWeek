import AbstractGameState from "../../engine/gameState/AbstractGameState";
import GameStateManager from "../../engine/gameState/GameStateManager";

export default class MenuGameState extends AbstractGameState {
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
    ctx.fillText("Welcome to menu", 100, 100);
  }
}
