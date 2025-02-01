import KeyboardListener from "../KeyboardListener";
import Renderer from "../rendering/Renderer";
import GameState from "./GameState";
import GameStateFactory from "./GameStateFactory";

export default class GameStateManager {
  public static instance: GameStateManager;

  private renderer!: Renderer;
  private keyboardListener: KeyboardListener;

  private currentGameState: GameState | null = null;

  private constructor() {
    this.keyboardListener = new KeyboardListener();
  }

  // SINGLETON
  public static getInstatnce(): GameStateManager {
    if (!GameStateManager.instance) {
      throw new Error("GameStateManager is not configured yet");
    }
    return GameStateManager.instance;
  }

  public static setUp(renderer: Renderer): void {
    if (GameStateManager.instance) {
      throw new Error("GameStateManager is already configured.");
    }

    const instance = new GameStateManager();
    instance.renderer = renderer;

    GameStateManager.instance = instance;
  }

  public switchGameState(name: string) {
    if (this.currentGameState) {
      this.currentGameState.stop();
    }

    const gs = GameStateFactory.getInstatnce().create(name);

    if (!gs)
      throw new Error(`Game State with the name ${name} does not exist!`);

    this.currentGameState = gs;
    this.currentGameState.start();
  }

  public tickCurrentGameState(): void {
    if (!this.currentGameState) return;
    this.currentGameState.tick();
  }

  public renderCurrentGameState(): void {
    if (!this.currentGameState) return;
    this.getRenderer().clear();
    this.currentGameState.draw();
  }

  public getRenderer(): Renderer {
    return this.renderer;
  }

  public getCurrentGameState(): GameState | null {
    return this.currentGameState;
  }

  public fireKeyBoardEvents(keysPressed: string[]): void {
    if (!this.currentGameState) return;
    this.currentGameState.keyboardEvents(keysPressed);
  }
}
