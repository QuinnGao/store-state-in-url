// rollup.config.js
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';
import config from './tsconfig.json' with { type: "json" };

export default {
    input: 'packages/src/index.ts',
    output: [
        {
            file: 'dist/index.mjs',
            plugins: [terser()],
            format: 'es'
        }
    ],
    plugins: [
        resolve({
            browser: true
        }),
        typescript({
            tsconfig: './tsconfig.build.json',
            compilerOptions: { ...config.compilerOptions, declaration: true },
        }),
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