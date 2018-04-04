# rollup-plugin-shader

Convert GLSL files to ES6 modules:

```glsl
// shader.glsl
uniform
```

```javascript
// import a single property from a JSON file,
// discarding the rest
import { version } from './package.json';
console.log( `running version ${version}` );

// import the whole file as an object
import pkg from './package.json';
console.log( `running version ${pkg.version}` );
```

## Installation

```bash
npm install --save-dev rollup-plugin-shader
```

## Usage

```javascript
// rollup.config.js
import shader from 'rollup-plugin-shader';

export default {
    entry: 'src/main.js',
    dest: 'dist/bundle.js',
    format: 'iife',

    plugins: [
        shader( {

            // All match files will be parsed by default,
            // but you can also specifically include/exclude files
            include: '**/*.glsl',
            exclude: [ 'node_modules/foo/**', 'node_modules/bar/**' ],

            // specify whether to remove comments
            removeComments: true,   // default: true
        } )
    ]
};
```

## License
MIT
