const state = [];
let box = null;

Tsu.config = {
  width: '15em',
  duration: 200,
  timeout: 2000,
  clickEvent: false,
  position: 'center'
};

export default function Tsu(label, opts) {
  this.label = label;
  this.opts = {
    color: '#fff',
    size: 3,
    label: true
  };

  if (opts.color !== null || typeof opts.color !== 'undefined') {
    this.opts.color = opts.color;
  }

  if (typeof opts.size === 'number') {
    this.opts.size = opts.size;
  } else if (typeof opts.size !== 'undefined') {
    throw Error('`size` specify a Number');
  }

  if (opts.label === 'boolean') {
    this.opts.label = opts.label;
  } else if (typeof opts.label !== 'undefined') {
    throw Error('`label` specify a Boolean');
  }
}

Tsu.prototype.add = function add(msg) {
  if (!box) {
    box = init();
  }

  const log = create(this.label, msg, this.opts);
  if (Tsu.config.clickEvent) {
    log.addEventListener('click', handleClick, false);
  }
  insert(log);
  setTimeout(show.bind(null, log), 0);

  if (state.length > this.opts.size) {
    const target = state.pop();
    remove(target);
  }

  if (Tsu.config.timeout) {
    try {
      setTimeout(() => remove(log, 'hide'), Tsu.config.timeout);
    } catch (e) {
      throw Error(e);
    }
  }
};

function init() {
  injectStyle();
  const box = document.createElement('ul');
  box.className = 'tsu__box';
  document.body.appendChild(box);
  return box;
}

function create(label, msg, opts) {
  const log = document.createElement('li');
  let labelEl = '';
  if (opts.label) {
    labelEl = `<span class="tsu__label">${label}</span>`;
  }
  log.className = `tsu__log tsu__${label}`;
  log.innerHTML = `<div class="tsu__inner">
                     ${labelEl}
                     <span class="tsu__message">${msg}</span>
                   </div>`;
  log.children[0].style.background = opts.color;
  return log;
}

function insert(el) {
  try {
    box.insertBefore(el, box.children[0]);
  } catch (e) {
    box.appendChild(el);
  }
  el.setAttribute('data-height', el.children[0].clientHeight);
  state.unshift(el);
}

function show(el) {
  const height = el.getAttribute('data-height');
  el.style.height = `${height}px`;
  el.style.opacity = 1;
}

function remove(el, type) {
  if (type === null || typeof type === 'undefined') {
    type = 'fall';
  }

  switch (type) {
    case 'fall':
      fall(el);
      break;
    case 'hide':
      hide(el);
      break;
    default:
      hide(el);
      break;
  }

  if (Tsu.config.clickEvent) {
    el.removeEventListener('click', handleClick, false);
  }
}

function handleClick(e) {
  remove(e.currentTarget, 'hide');
}

function fall(el) {
  const height = el.getAttribute('data-height');
  el.style.opacity = 0;
  el.children[0].style.top = `${height}px`;
  setTimeout(() => {
    if (el.parentNode) {
      el.parentNode.removeChild(el);
    }
  }, Tsu.config.duration / 1000 * 1.6);
}

function hide(el) {
  el.style.opacity = 0;
  el.style.height = 0;
}

function injectStyle() {
  const style = document.createElement('style');
  const easeOutBack = 'cubic-bezier(0.175, 0.885, 0.32, 1.275)';
  if (typeof Tsu.config.duration !== 'number' ||
      Tsu.config.duration < 0) {
    throw Error('Please `Tsu.config.duration` specify a number value');
  }
  const sec4Slower = Tsu.config.duration / 1000;
  const sec4Faster = sec4Slower / 1.6;
  let position;
  if (Tsu.config.position === 'left') {
    position = 'left: 1em;';
  } else if (Tsu.config.position === 'right') {
    position = 'right: 1em;';
  } else if (Tsu.config.position === 'center') {
    position = `right: 50%;
                -ms-transform: translateX(50%);
                -webkit-transform: translateX(50%);
                transform: translateX(50%);`;
  } else {
    throw Error('`position` specify one of the `left`, `center`, `right`');
  }

  const css = [
    '.tsu__box {',
    'position: fixed;',
    'top: 1em;',
    `min-width: ${Tsu.config.width};`,
    `${position}`,
    'list-style: none;',
    '}',
    '.tsu__log {',
    'overflow: hidden;',
    'margin: .5em;',
    '-webkit-transition:',
    `height ${sec4Slower}s ${easeOutBack},`,
    `opacity ${sec4Faster}s ease-out;`,
    'transition:',
    `height ${sec4Slower}s ${easeOutBack},`,
    `opacity ${sec4Faster}s ease-out;`,
    'height: 0;',
    'opacity: 0;',
    '-webkit-user-select: none;',
    '-moz-user-select: none;',
    '-ms-user-select: none;',
    'user-select: none;',
    '}',
    '.tsu__inner {',
    'position: relative;',
    'padding: .5em;',
    `-webkit-transition: top ${sec4Faster}s ease-out;`,
    `transition: top ${sec4Faster}s ease-out;`,
    'top: 0;',
    '}',
    '.tsu__label {',
    'padding: .3em .5em;',
    'margin-right: .5em;',
    'border-radius: 7px;',
    'background: hsla(0, 100%, 100%, .3);',
    '}'
  ].join('');
  style.innerText = css;
  document.head.insertBefore(style, document.head.children[0]);
}
