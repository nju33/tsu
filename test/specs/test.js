import Tsu from '../..';
import test from 'ava';
import sinon from 'sinon';
import jsdom from 'jsdom';

global.document = jsdom.jsdom();

test('throws', (t) => {
  const log = new Tsu('test', {color: '#333'});

  t.throws(log.add('test!'));
});
