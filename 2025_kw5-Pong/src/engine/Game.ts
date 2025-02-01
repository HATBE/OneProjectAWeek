import GameLoop from "./GameLoop";
import GameStateManager from "./gameState/GameStateManager";
import Renderer from "./rendering/Renderer";

export default class Game {
  private canvas: HTMLCanvasElement;
  private width: number;
  private height: number;

  private renderer: Renderer;
  private gameLoop: GameLoop;

  public constructor(
    canvas: HTMLCanvasElement,
    width: number,
    height: number,
    targetFps: number = 60
  ) {
    this.canvas = canvas;
    this.width = width;
    this.height = height;

    this.renderer = new Renderer(this.canvas, this.width, this.height);
    GameStateManager.setUp(this.renderer);

    this.gameLoop = new GameLoop(targetFps);

    // TODO: debug
    GameStateManager.getInstatnce().switchGameState("ingame"); //GameStateManager.getInstatnce().switchGameState("menu"); // set initial gameState
  }
}
