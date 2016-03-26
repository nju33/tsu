/*!
 * Copyright 2016, nju33
 * Released under the MIT License
 * https://github.com/totora0155/tsu.js
 */

 var box = null;

 Tsu.config = {
   timeout: 2000,
 };

export default function Tsu(label, opts) {
  this.label = label;
  this.opts = opts || {};
}

Tsu.prototype.add = function add(msg) {
  if (!box) {
    box = init();
  }

  var log = create(msg);
  box.appendChild(log);
}

function init() {
  var box = document.createElement('ul');
  box.className = 'tsu__box';
  document.body.appendChild(box);
  return box;
}

function create(msg) {
  var log = document.createElement('li');
  log.className = 'tsu__log';
  log.innerText = msg;
  return log;
}

function show(el) {
}
