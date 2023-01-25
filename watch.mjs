import { stdin, stdout } from "process";

import esbuild from "esbuild";

const ctx = await esbuild.context({
  entryPoints: ["src/index.ts"],
  bundle: true,
  sourcemap: "inline",
  outfile: "watch/bundle.js",
  plugins: [
    {
      name: "Watcher",
      setup(build) {
        build.onStart(() => {
          console.log("build started");
        });
        build.onEnd((result) => {
          console.log(
            `build ended with ${result.errors.length} errors and ${result.warnings.length} warnings`
          );
        });
      },
    },
  ],
});

await ctx.watch({});
console.log("Watching... [B]uild / [Q]uit");

// without this, we would only get streams once enter is pressed
stdin.setRawMode(true);

// resume stdin in the parent process (node app won't quit all by itself
// unless an error or process.exit() happens)
stdin.resume();

// i don't want binary, do you?
stdin.setEncoding("utf8");

// on any data into stdin
stdin.on("data", (key) => {
  switch (key) {
    // quit on Ctrl+C or Q
    case "\u0003":
    case "q":
    case "Q":
      ctx.dispose();
      stdin.pause();
      return;

    case "b":
    case "B":
      ctx.rebuild();
      return;
  }

  // write the key to stdout all normal like
  stdout.write(key);
});
