import Game from "./engine/Game";
import GameStateFactory from "./engine/gameState/GameStateFactory";
import InGameGameState from "./pong/gameState/InGameGameState";
import MenuGameState from "./pong/gameState/MenuGameState";

const canvas: HTMLCanvasElement | null = document.getElementById(
  "game-canvas"
) as HTMLCanvasElement;

// TODO: temp registration
GameStateFactory.getInstatnce().registerGameState("menu", MenuGameState);
GameStateFactory.getInstatnce().registerGameState("ingame", InGameGameState);

new Game(canvas, 1280, 720);
