import { DEFAULT_FONT, Terminal } from "wglt";

import Engine from "@app/Engine";
import { HUD_HEIGHT } from "./systems/HUD";

function loadEngine(parent: HTMLElement) {
  const cols = 60;
  const rows = 40;
  const font = DEFAULT_FONT;

  const container = document.createElement("div");
  parent.appendChild(container);
  const onResize = () => {
    const wantWidth = cols * font.charWidth;
    const wantHeight = rows * font.charHeight;

    const ratioWidth = Math.floor(window.innerWidth / wantWidth);
    const ratioHeight = Math.floor(window.innerHeight / wantHeight);
    const ratio = Math.min(ratioWidth, ratioHeight);

    container.style.width = `${wantWidth * ratio}px`;
    container.style.height = `${wantHeight * ratio}px`;
  };
  window.addEventListener("resize", onResize);
  onResize();

  const canvas = document.createElement("canvas");
  container.appendChild(canvas);
  requestAnimationFrame(() => canvas.focus());

  const term = new Terminal(canvas, cols, rows, { font });
  const g = new Engine(term, cols, rows - HUD_HEIGHT);
  g.gotoDemoRoom();
  (window as any).g = g;
}

window.addEventListener("load", () => loadEngine(document.body));
