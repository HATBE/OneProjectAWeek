import AbstractGameState from "../../engine/gameState/AbstractGameState";
import GameStateManager from "../../engine/gameState/GameStateManager";
import Ball from "../entities/Ball";

export default class InGameGameState extends AbstractGameState {
  private ctx = GameStateManager.getInstatnce().getRenderer().getContext();

  private ball = new Ball(0, 0);

  public stop(): void {}
  public start(): void {}

  public tick(): void {
    /*TODO: pedalsif (this.isKeyPressed("w")) {
      this.ball.setY(this.ball.getY() - 1);
    }

    if (this.isKeyPressed("a")) {
      this.ball.setX(this.ball.getX() - 1);
    }

    if (this.isKeyPressed("s")) {
      this.ball.setY(this.ball.getY() + 1);
    }

    if (this.isKeyPressed("d")) {
      this.ball.setX(this.ball.getX() + 1);
    }*/
  }

  public draw(): void {
    GameStateManager.getInstatnce().getRenderer().drawBackground("black");
    GameStateManager.getInstatnce()
      .getRenderer()
      .drawDashedLine(
        GameStateManager.getInstatnce().getRenderer().getWidth() / 2,
        10 / 2, // half a dash
        GameStateManager.getInstatnce().getRenderer().getWidth() / 2,
        GameStateManager.getInstatnce().getRenderer().getHeight(),
        10, // dash
        "white"
      );

    GameStateManager.getInstatnce().getRenderer().drawRenderable(this.ball);
  }
}
