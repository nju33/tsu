/*!
 * Copyright 2016, nju33
 * Released under the MIT License
 * https://github.com/totora0155/tsu.js
 */

 var box = null;
 var state = [];

 Tsu.config = {
   width: '15em',
   timeout: 2000,
   clickEvent: false,
 }

export default function Tsu(label, opts) {
  this.label = label;
  this.opts = {
    color: '#fff',
    size: 3,
  };

  if (opts.color != null) {
    this.opts.color = opts.color;
  }

  if (opts.size != null) {
    if (typeof opts.size !== 'number') {
      throw Error('Please `size` specify a number value');
    }
    this.opts.size = opts.size;
  }
}

Tsu.prototype.add = function add(msg) {
  if (!box) {
    box = init();
  }

  var log = create(this.label, msg, this.opts);
  if (Tsu.config.clickEvent) {
    log.addEventListener('click', handleClick, false);
  }
  insert(log);
  setTimeout(show.bind(null, log), 0);

  if (state.length > this.opts.size) {
    var target = state.pop();
    remove(target);
  }

  if (Tsu.config.timeout) {
    try {
      setTimeout(function() {
        remove(log, 'hide');
      }, Tsu.config.timeout);
    } catch (e) {
      throw Error(e);
    }
  }
}

function init() {
  injectStyle();
  var box = document.createElement('ul');
  box.className = 'tsu__box';
  document.body.appendChild(box);
  return box;
}

function create(label, msg, opts) {
  var log = document.createElement('li');
  log.className = 'tsu__log tsu__' + label;
  log.innerHTML =  '<div class="tsu__inner">' +
                     '<span class="tsu__label">' + label + '</span>' +
                     '<span class="tsu__message">' + msg + '</span>' +
                   '</div>';
  log.children[0].style.background = opts.color;
  return log;
}

function insert(el) {
  box.insertBefore(el, box.children[0]);
  el.setAttribute('data-height', el.children[0].clientHeight);
  state.unshift(el);
}

function show(el) {
  var height = el.getAttribute('data-height');
  el.style.height = height + 'px';
  el.style.opacity = 1;
}

function remove(el, type) {
  if (type == null) {
    type = 'fall'
  }

  switch (type) {
    case 'fall':
      fall(el);
      break;
    case 'hide':
      hide(el);
      break;
  }

  if (Tsu.config.clickEvent) {
    log.removeEventListener('click', handleClick, false);
  }
}

function handleClick(e) {
  remove(e.currentTarget, 'hide');
}

function fall(el) {
  var height = el.getAttribute('data-height');
  el.style.opacity = 0;
  el.children[0].style.top = height + 'px';
  setTimeout(function() {
    if (el.parentNode) {
      el.parentNode.removeChild(el);
    }
  }, 125);
}

function hide(el) {
  el.style.opacity = 0;
  el.style.height = 0;
}

function injectStyle() {
  var style = document.createElement('style');
  var easeOutBack = 'cubic-bezier(0.175, 0.885, 0.32, 1.275)';
  var css = '.tsu__box {' +
              'position: fixed;' +
              'right: 50%;' +
              'top: 1em;' +
              'min-width: ' + Tsu.config.width + ';' +
              '-ms-transform: translateX(50%);' +
              '-webkit-transform: translateX(50%);' +
              'transform: translateX(50%);' +
              'list-style: none;' +
            '}' +
            '.tsu__log {' +
              'overflow:hidden;' +
              'margin: .5em;' +
              '-webkit-transition:' +
                'height .2s ' + easeOutBack + ',' +
                'opacity .125s ease-out;' +
              'transition:' +
                'height .2s ' + easeOutBack + ',' +
                'opacity .125s ease-out;' +
              'height: 0;' +
              'opacity: 0;' +
              '-webkit-user-select: none;' +
              '-moz-user-select: none;' +
              '-ms-user-select: none;' +
              'user-select: none;' +
            '}' +
            '.tsu__inner {' +
              'position: relative;' +
              'padding: .5em;' +
              '-webkit-transition: top .125s ease-out;' +
              'transition: top .125s ease-out;' +
              'top: 0;' +
            '}' +
            '.tsu__label {' +
              'padding: .3em .5em;' +
              'margin-right: .5em;' +
              'border-radius: 7px;' +
              'background: hsla(0, 100%, 100%, .3);' +
            '}'
            ;
  style.innerText = css;
  document.head.insertBefore(style, document.head.children[0]);
}
