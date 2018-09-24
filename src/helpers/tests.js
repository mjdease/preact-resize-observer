// Hack to allow the resize-observer-polyfill check for `Element instanceof Object` to pass
// ref - https://github.com/que-etc/resize-observer-polyfill/blob/a3ae98bcd34e972b92d9e40e8b974a75399503e8/src/ResizeObserverSPI.js#L76
// This also breaks some usages of Object by preact-render-spy so we can enable/disable it as needed
// https://github.com/jsdom/jsdom/issues/1769

const originalObject = Object;

class ObjectExt extends Object {
  static [Symbol.hasInstance](instance) {
    return true;
  }
}

global.overrideObject = function() {
  Object = ObjectExt;
};

global.restoreObject = function() {
  Object = originalObject;
};
