/*
This file is used to create the test environment that will be used by all the tests.
Here we use jsdom to create a virtual dom that allows us to use all of enzymes
features. ex: mount()
 */

/*
Start of jsdom setup
This was copied from https://airbnb.io/enzyme/docs/guides/jsdom.html
 */
const { JSDOM } = require('jsdom');

const jsdom = new JSDOM('<!doctype html><html><body></body></html>');
const { window } = jsdom;

function copyProps(src, target) {
  Object.defineProperties(target, {
    ...Object.getOwnPropertyDescriptors(src),
    ...Object.getOwnPropertyDescriptors(target),
  });
}

global.window = window;
global.document = window.document;
global.navigator = {
  userAgent: 'node.js',
};
global.requestAnimationFrame = function (callback) {
  return setTimeout(callback, 0);
};
global.cancelAnimationFrame = function (id) {
  clearTimeout(id);
};
copyProps(window, global);
/*
End of jsdom setup
 */
