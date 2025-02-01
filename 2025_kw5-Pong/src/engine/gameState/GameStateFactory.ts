import GameState from "./GameState";

export type GameStateConstructor = new () => GameState;

export type RegistredGameState = {
  name: string;
  gameStateConstructor: GameStateConstructor;
};

export default class GameStateFactory {
  public static instance: GameStateFactory;

  private gameStatesReg: RegistredGameState[] = [];

  private constructor() {}

  // SINGLETON
  public static getInstatnce(): GameStateFactory {
    if (!GameStateFactory.instance) {
      GameStateFactory.instance = new GameStateFactory();
    }
    return GameStateFactory.instance;
  }

  public registerGameState(
    name: string,
    gameStateConstructor: GameStateConstructor
  ): void {
    if (this.isGameState(name)) return; // gs already existing! TODO: maybe throw?
    this.gameStatesReg.push({ name, gameStateConstructor });
  }

  public unregisterGameState(name: string): void {
    this.gameStatesReg = this.gameStatesReg.filter((gameStateReg) => {
      return gameStateReg.name !== name;
    });
  }

  public isGameState(name: string): boolean {
    return this.gameStatesReg.some((i) => i.name === name);
  }

  public create(name: string): GameState | null {
    const gameStateReg = this.gameStatesReg.find(
      (gameStateReg) => gameStateReg.name === name
    );

    if (!gameStateReg) return null;

    return new gameStateReg.gameStateConstructor();
  }
}
