import AbstractGameState from "../../engine/gameState/AbstractGameState";
import GameStateManager from "../../engine/gameState/GameStateManager";

export default class MenuGameState extends AbstractGameState {
  stop(): void {}

  start(): void {}

  tick(): void {
    if (this.isKeyPressed("s")) {
      GameStateManager.getInstatnce().switchGameState("ingame");
    }
  }

  draw(): void {
    GameStateManager.getInstatnce().getRenderer().drawBackground("black");

    const ctx = GameStateManager.getInstatnce().getRenderer().getContext();

    const title = `Pong`;
    const subtitle = 'Press "S" to start the game!';
    const infoText = 'Press "ESC" to quit the game.';

    ctx.fillStyle = "white";
    ctx.font = "60px ARCADECLASSIC";
    ctx.fillText(
      title,
      GameStateManager.getInstatnce().getRenderer().getWidth() / 2 -
        ctx.measureText(title).width / 2,
      GameStateManager.getInstatnce().getRenderer().getHeight() / 2 - 10
    );
    ctx.fillStyle = "red";
    ctx.font = "25px ARCADECLASSIC";
    ctx.fillText(
      subtitle,
      GameStateManager.getInstatnce().getRenderer().getWidth() / 2 -
        ctx.measureText(subtitle).width / 2,
      GameStateManager.getInstatnce().getRenderer().getHeight() / 2 + 20
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
