import test from "ava";

import "./global.setup";

test("simple test", async t => {
  const app = t.context.app;
  let title = await t.context.app.client.waitUntilWindowLoaded().getTitle();
  t.is(title, "js-boilerplate");

  const win = app.browserWindow;
  let min = await win.isMinimized();
  t.false(min);

  let c = await app.client.getWindowCount();
  t.is(c, 1);
});
