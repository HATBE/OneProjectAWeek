import GameStateManager from "./gameState/GameStateManager";

export default class GameLoop {
  private targetFPS;

  private oldTimeStamp = 0;
  private frameDelay;
  private currentFPS = 0;

  public constructor(targetFPS: number = 60) {
    this.targetFPS = targetFPS;
    this.frameDelay = 1000 / this.targetFPS;

    this.loop(this.oldTimeStamp);
  }

  private loop(timestamp: number): void {
    const elapsed = timestamp - this.oldTimeStamp;

    if (elapsed >= this.frameDelay) {
      this.oldTimeStamp = timestamp;

      this.currentFPS = Math.round(1000 / elapsed);

      GameStateManager.getInstatnce().tickCurrentGameState();
      GameStateManager.getInstatnce().renderCurrentGameState();
    }

    window.requestAnimationFrame((timestamp) => {
      this.loop(timestamp);
    });
  }

  public getCurrentFps() {
    return this.currentFPS;
  }
}
