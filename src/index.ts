import Engine from "@app/Engine";
import { Terminal } from "wglt";

function loadEngine(parent: HTMLElement) {
  const cols = 60;
  const rows = 40;

  const container = document.createElement("div");
  parent.appendChild(container);
  const onResize = () => {
    const wantWidth = cols * 8;
    const wantHeight = rows * 8;

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

  const term = new Terminal(canvas, cols, rows);
  const g = new Engine(term);
  g.gotoDemoRoom();
  (window as any).g = g;
}

window.addEventListener("load", () => loadEngine(document.body));
