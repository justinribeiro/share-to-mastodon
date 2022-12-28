import { terser } from 'rollup-plugin-terser';
import resolve from 'rollup-plugin-node-resolve';
import filesize from 'rollup-plugin-filesize';
import minifyHTML from 'rollup-plugin-minify-html-literals';

export default [
  {
    input: ['share-to-mastodon.js'],
    output: {
      dir: 'dist/',
      entryFileNames: 'share-to-mastodon.min.js',
      format: 'esm',
      sourcemap: true,
    },
    onwarn(warning) {
      if (warning.code !== 'CIRCULAR_DEPENDENCY') {
        console.error(`(!) ${warning.message}`);
      }
    },
    plugins: [
      resolve(),
      minifyHTML(),
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
