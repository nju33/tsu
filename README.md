# Tsu.js

[![Build Status](https://travis-ci.org/totora0155/tsu.js.svg?branch=master)](https://travis-ci.org/totora0155/tsu.js)
[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/sindresorhus/xo)
[![npm version](https://badge.fury.io/js/tsu.js.svg)](https://badge.fury.io/js/tsu.js)

Just a notification in Vanilla

## Usage

in Node

```
npm i -S tsu.js
```

in Browsers

```
<script src="tsu.js"></script>
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
