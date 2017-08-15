/* eslint-disable */
var jsdom = require("jsdom");
global.window = new jsdom.JSDOM("<body></body>").window;
global.document = window.document;
global.navigator = window.navigator;
