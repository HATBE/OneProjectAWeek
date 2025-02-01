import "./style.css";

import Game from "./engine/Game";
import GameStateFactory from "./engine/gameState/GameStateFactory";
import GameOverGameState from "./pong/gameState/GameOverGameState";
import InGameGameState from "./pong/gameState/InGameGameState";
import MenuGameState from "./pong/gameState/MenuGameState";

const canvas: HTMLCanvasElement | null = document.getElementById(
  "game-canvas"
) as HTMLCanvasElement;

// TODO: temp registration
GameStateFactory.getInstatnce().registerGameState("menu", MenuGameState);
GameStateFactory.getInstatnce().registerGameState("ingame", InGameGameState);
GameStateFactory.getInstatnce().registerGameState(
  "gameover",
  GameOverGameState
);

new Game(canvas, 1280, 720);
