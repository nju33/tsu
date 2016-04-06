import babel from 'rollup-plugin-babel';
const banner = `
/*!
 * Copyright 2016, nju33
 * Released under the MIT License
 * https://github.com/totora0155/tsu.js
 */
`;

export default {
  banner: banner.trim(),
  entry: 'lib/tsu.js',
  format: 'umd',
  dest: 'dist/tsu.js',
  moduleName: 'Tsu',
  plugins: [
    babel()
  ]
