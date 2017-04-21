import path from "path";

import test from "ava";
import { Application } from "spectron";

const isWin = process.platform === "win32";

test.beforeEach(async t => {
  t.context.app = new Application({
    path: path.resolve(
      __dirname,
      "../node_modules/.bin/electron" + (isWin ? ".cmd" : "")
    ),
    args: [path.resolve(__dirname, "../dist/main.js")]
  });
  await t.context.app.start();
});

test.afterEach(async t => {
  await t.context.app.stop();
});
