import AbstractGameState from "../../engine/gameState/AbstractGameState";
import GameStateManager from "../../engine/gameState/GameStateManager";

export default class GameOverGameState extends AbstractGameState {
  stop(): void {}

  start(): void {}

  tick(): void {
    if (this.isKeyPressed("m")) {
      GameStateManager.getInstatnce().switchGameState("menu");
    }
  }

  draw(): void {
    GameStateManager.getInstatnce().getRenderer().drawBackground("black");

    const ctx = GameStateManager.getInstatnce().getRenderer().getContext();

    const title = `Game OVER!`;
    const infoText = 'Press "M" to go to the menu.';

    ctx.fillStyle = "red";
    ctx.font = "60px ARCADECLASSIC";
    ctx.fillText(
      title,
      GameStateManager.getInstatnce().getRenderer().getWidth() / 2 -
        ctx.measureText(title).width / 2,
      GameStateManager.getInstatnce().getRenderer().getHeight() / 2 - 10
    );
    ctx.fillStyle = "white";
    ctx.font = "16px ARCADECLASSIC";
    ctx.fillText(
      infoText,
      GameStateManager.getInstatnce().getRenderer().getWidth() / 2 -
        ctx.measureText(infoText).width / 2,
      GameStateManager.getInstatnce().getRenderer().getHeight() - 10
    );
  }
}
