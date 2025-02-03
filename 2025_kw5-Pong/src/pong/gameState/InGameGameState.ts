import AbstractGameState from "../../engine/gameState/AbstractGameState";
import GameStateManager from "../../engine/gameState/GameStateManager";
import Ball from "../entities/Ball";
import Pedal from "../entities/Pedal";

export default class InGameGameState extends AbstractGameState {
  private ball;
  private leftPedal;
  private rightPedal;

  private scoreRight = 0;
  private scoreLeft = 0;

  public constructor() {
    super();

    this.rightPedal = new Pedal(
      GameStateManager.getInstatnce().getRenderer().getWidth() - 20,
      GameStateManager.getInstatnce().getRenderer().getHeight() / 2 - 45
    );

    this.leftPedal = new Pedal(
      10,
      GameStateManager.getInstatnce().getRenderer().getHeight() / 2 - 45
    );

    this.ball = new Ball(0, 0);

    this.resetBall();
  }

  public stop(): void {}

  public start(): void {
    this.resetBall();
  }

  private rightScored() {
    this.scoreRight++;

    if (this.scoreRight >= 10) {
      //winner = "right";
      GameStateManager.getInstatnce().switchGameState("gameover");
    }
  }

  private leftScored() {
    this.scoreLeft++;

    if (this.scoreLeft >= 10) {
      //winner = "left";
      GameStateManager.getInstatnce().switchGameState("gameover");
    }
  }

  private tickBall(): void {
    this.ball.setX(this.ball.getX() + this.ball.getDx());
    this.ball.setY(this.ball.getY() + this.ball.getDy());

    // if ball intersects top, redirect
    if (this.ball.getY() <= 0) {
      this.ball.setDy(-this.ball.getDy());
    }
    // if ball intersects bottom, redirect
    else if (
      this.ball.getY() + this.ball.getWidth() >=
      GameStateManager.getInstatnce().getRenderer().getHeight()
    ) {
      this.ball.setDy(-this.ball.getDy());
    }
    // if ball intersects left, death
    else if (this.ball.getX() <= 0) {
      this.rightScored();
      this.resetBall();
    }
    // if ball intersects right, death
    else if (
      this.ball.getX() + this.ball.getWidth() >=
      GameStateManager.getInstatnce().getRenderer().getWidth()
    ) {
      this.leftScored();
      this.resetBall();
    }

    if (
      this.ball.getX() < this.leftPedal.getX() + this.ball.getWidth() &&
      this.ball.getY() + this.ball.getHeight() > this.leftPedal.getY() &&
      this.ball.getY() < this.leftPedal.getY() + this.leftPedal.getHeight()
    ) {
      // right, top, bottom
      this.ball.setDx(-this.ball.getDx());
    }
    // if ball intersects right, redirect
    else if (
      this.ball.getX() + this.ball.getWidth() > this.rightPedal.getX() &&
      this.ball.getY() + this.ball.getHeight() > this.rightPedal.getY() &&
      this.ball.getY() < this.rightPedal.getY() + this.rightPedal.getHeight()
    ) {
      // left, top, bottom
      this.ball.setDx(-this.ball.getDx());
    }
  }

  private tickPedals(): void {
    // TODO: rework padel movement script
    if (this.isKeyPressed("ArrowUp")) {
      if (this.rightPedal.getY() - this.rightPedal.getSpeed() <= 0) {
        this.rightPedal.setY(0);
      } else {
        this.rightPedal.setY(
          this.rightPedal.getY() - this.rightPedal.getSpeed()
        );
      }
    }

    if (this.isKeyPressed("ArrowDown")) {
      if (
        this.rightPedal.getY() +
          this.rightPedal.getHeight() +
          this.rightPedal.getSpeed() <=
        GameStateManager.getInstatnce().getRenderer().getHeight()
      ) {
        this.rightPedal.setY(
          this.rightPedal.getY() + this.rightPedal.getSpeed()
        );
      } else {
        this.rightPedal.setY(
          GameStateManager.getInstatnce().getRenderer().getHeight() -
            this.rightPedal.getHeight()
        );
      }
    }

    if (this.isKeyPressed("w")) {
      if (this.leftPedal.getY() - this.leftPedal.getSpeed() <= 0) {
        this.leftPedal.setY(0);
      } else {
        this.leftPedal.setY(this.leftPedal.getY() - this.leftPedal.getSpeed());
      }
    }

    if (this.isKeyPressed("s")) {
      if (
        this.leftPedal.getY() +
          this.leftPedal.getHeight() +
          this.leftPedal.getSpeed() <=
        GameStateManager.getInstatnce().getRenderer().getHeight()
      ) {
        this.leftPedal.setY(this.leftPedal.getY() + this.leftPedal.getSpeed());
      } else {
        this.leftPedal.setY(
          GameStateManager.getInstatnce().getRenderer().getHeight() -
            this.leftPedal.getHeight()
        );
      }
    }
  }

  public tick(): void {
    if (this.isKeyPressed("Escape")) {
      GameStateManager.getInstatnce().switchGameState("menu");
    }

    this.tickPedals();
    this.tickBall();
  }

  private resetBall() {
    this.ball.setX(
      GameStateManager.getInstatnce().getRenderer().getWidth() / 2 - 5
    );
    this.ball.setY(
      GameStateManager.getInstatnce().getRenderer().getHeight() / 2 - 5
    );

    this.ball.setDx(
      Math.random() < 0.5 ? this.ball.getSpeed() : -this.ball.getSpeed()
    );
    this.ball.setDy(
      Math.random() < 0.5 ? this.ball.getSpeed() : -this.ball.getSpeed()
    );

    this.ball.setSpeed(
      Math.max(Math.max(this.scoreLeft, this.scoreRight) + 0.5, 2)
    );
  }

  public draw(): void {
    GameStateManager.getInstatnce().getRenderer().drawBackground("black"); // background

    // dashed center line
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

    // score left
    GameStateManager.getInstatnce()
      .getRenderer()
      .drawText(
        this.scoreLeft.toString(),
        GameStateManager.getInstatnce().getRenderer().getWidth() / 2 - 50,
        50
      );

    // score right
    GameStateManager.getInstatnce()
      .getRenderer()
      .drawText(
        this.scoreRight.toString(),
        GameStateManager.getInstatnce().getRenderer().getWidth() / 2 +
          50 -
          GameStateManager.getInstatnce()
            .getRenderer()
            .getContext()
            .measureText(this.scoreLeft.toString()).width,
        50
      );

    // ball
    GameStateManager.getInstatnce().getRenderer().drawRenderable(this.ball);

    // left pedal
    GameStateManager.getInstatnce()
      .getRenderer()
      .drawRenderable(this.leftPedal);

    // right pedal
    GameStateManager.getInstatnce()
      .getRenderer()
      .drawRenderable(this.rightPedal);
  }
}
