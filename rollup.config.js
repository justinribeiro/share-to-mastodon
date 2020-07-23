import { terser } from 'rollup-plugin-terser';
import resolve from 'rollup-plugin-node-resolve';
import filesize from 'rollup-plugin-filesize';

export default [
  {
    input: ['share-to-mastodon.js'],
    output: {
      dir: 'dist/',
      entryFileNames: 'share-to-mastodon.js',
      format: 'esm',
    },
    onwarn(warning) {
      if (warning.code !== 'CIRCULAR_DEPENDENCY') {
        console.error(`(!) ${warning.message}`);
      }
    },
    plugins: [
      resolve(),
      terser({
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
