import Tsu from '../..';
import test from 'ava';
import jsdom from 'jsdom';

global.document = jsdom.jsdom();

test('Throw for size opt', (t) => {
  t.throws(() => new Tsu('test', {size: 'string'}));
});

test('Throw for label opt', (t) => {
  t.throws(() => new Tsu('test', {label: 'string'}));
});

test('Throw for position opt', (t) => {
  Tsu.config.position = 'somewhere';
  t.throws(() => new Tsu('test'));
})
