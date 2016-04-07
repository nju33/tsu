# Tsu.js

[![Build Status](https://travis-ci.org/totora0155/tsu.js.svg?branch=master)](https://travis-ci.org/totora0155/tsu.js)
[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/sindresorhus/xo)
[![npm version](https://badge.fury.io/js/tsu.js.svg)](https://badge.fury.io/js/tsu.js)

Just a notification in Vanilla

## Install

```
npm i -S tsu.js
```

or

```
bower i -S tsu.js
```

## Usage

in CommonJS
```js
const Tsu = require('tsu.js');
```

in ES6
```js
import Tsu from 'tsu.js';
```

in Browsers

```html
<script src="tsu.js"></script>
<!-- <script src="bower_components/tsu.js/dist/tsu.min.js"></script> -->
```

## Example
```html
<!DOCTYPE html>
<html>
<body>
  <button id="success">success</button>
  <button id="danger">danger</button>
  <script src="path/to/tsu.js"></script>
  <script>
    var success = new Tsu('success', {color: '#5cb85c'});
    var danger = new Tsu('danger', {color: '#d9534f'});
    document.getElementById('success').addEventListener('click', function() {
      success.add('Good');
    });
    document.getElementById('danger').addEventListener('click', function() {
      danger.add('Woops');
    });
  </script>
</body>
</html>

```

![Tsu.js example](https://raw.githubusercontent.com/totora0155/tsu.js/master/example.gif)

## HTML

[Tsu.js](https://github.com/totora0155/tsu.js) is to create like

```html
<ul class="tsu__box">
  <li class="tsu__log tsu__success" data-height="40">
    <div class="tsu__inner" style="background: rgb(92, 184, 92);">
      <span class="tsu__label">success</span>
      <span class="tsu__message">Good</span>
    </div>
  </li>
  <li class="tsu__log tsu__***" data-height="40">...
  <li class="tsu__log tsu__***" data-height="40">...
</ul>
```

## Methods

- `tsu.add(message)`  
  To display a notification with `message`

## Options

### Global

- `Tus.config.width`  
  Element width. By default `15em`
- `Tsu.config.duration`  
  Sec until to fadeIn/Out. By default `.2s`
- `Tsu.config.timeout`  
  Sec until element is hidden. By default `2s`  
  Disabled by setting the `null`
- `Tsu.config.clickEvent`  
  ...
- `Tsu.config.position`  
  `left`, `center`, `right`
- `Tsu.config.maxSize`  
  Max notification length. By default `3`

### Instance

- `color`  
  Background color. By default `#fff`
- `label`
  Whatever to display the `.tsu__label`. By default `true`
