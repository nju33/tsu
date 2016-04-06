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
