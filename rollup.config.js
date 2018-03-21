import babel from 'rollup-plugin-babel';

const pkg = require( './package.json' );

var external = Object.keys( pkg.dependencies );

export default {
    entry: 'src/index.js',
    targets: [
		{
            dest: pkg.main,
            format: 'cjs'
        },
        {
            dest: pkg.module,
            format: 'es'
        }
    ],
    plugins: [ babel() ],
    external: external,
    sourceMap: true
};
