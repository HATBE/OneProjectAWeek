import GameState from "../../engine/gameState/GameState";

export default class MenuGameState implements GameState {
  public constructor() {
    alert("menustate");
  }
  tick(): void {
    throw new Error("Method not implemented.");
  }
  draw(): void {
    throw new Error("Method not implemented.");
  }
  stop(): void {
    throw new Error("Method not implemented.");
  }
  start(): void {
    throw new Error("Method not implemented.");
  }
}
