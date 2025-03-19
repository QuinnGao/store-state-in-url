// rollup.config.js
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';

export default {
    input: 'packages/src/index.ts',
    output: [
        {
            file: 'dist/bundle.min.js',
            format: 'iife',
            name: 'myBundle',
            plugins: [terser()],
            sourcemap: true
        },
        {
            file: 'dist/bundle.esm.js',
            format: 'es',
            sourcemap: true
        }
    ],
    plugins: [
        resolve({
            browser: true
        }),
        typescript(),
        commonjs(),
        babel({
            babelHelpers: 'bundled',
            exclude: 'node_modules/**',
            presets: [
                ['@babel/preset-env', { targets: '> 0.25%, not dead' }]
            ]
        })
    ]
};