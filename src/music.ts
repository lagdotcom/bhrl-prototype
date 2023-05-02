import musicUrl from "@app/claw yr way back.mp3";

let musicPromise: Promise<HTMLAudioElement> | undefined;

export default function playTheMusic() {
  if (!musicPromise) {
    // console.log("music downloading");

    musicPromise = new Promise((resolve) => {
      const element = new Audio(musicUrl);
      element.addEventListener("canplaythrough", () => {
        // console.log("music downloaded");
        element.play();

        // loop it
        element.addEventListener("ended", () => {
          // console.log("music looping");
          element.currentTime = 0;
          element.play();
        });

        resolve(element);
      });
    });
  }
  return musicPromise;
}
