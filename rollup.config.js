import { terser } from 'rollup-plugin-terser';
import resolve from 'rollup-plugin-node-resolve';
import filesize from 'rollup-plugin-filesize';

export default [
  {
    input: ['share-to-mastodon.js'],
    output: {
      dir: 'dist/',
      entryFileNames: 'share-to-mastodon.min.js',
      format: 'esm',
      sourcemap: true,
    },
    plugins: [
      resolve(),
      terser({
        ecma: 2020,
        warnings: true,
        mangle: {
          module: true,
        },
        output: {
          comments: false,
        },
      }),
      filesize({
        showBrotliSize: true,
      }),
    ],
  },
];
