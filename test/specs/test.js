import Tsu from '../..';
import test from 'ava';
import jsdom from 'jsdom';

global.document = jsdom.jsdom();

test('Throw for label opt', t => {
  t.throws(() => new Tsu('test', {label: 'string'}));
});

test('Throw for maxSize opt', t => {
  Tsu.config.maxSize = 'string';
  t.throws(() => new Tsu('test'));
});

test('Throw for position opt', t => {
  Tsu.config.position = 'somewhere';
  t.throws(() => new Tsu('test'));
});

test('Throw for duration opt', t => {
  Tsu.config.duration = 'string';
  t.throws(() => new Tsu('test'));
});

test('Throw for timeout opt', t => {
  Tsu.config.timeout = 'string';
  t.throws(() => new Tsu('test'));
});
