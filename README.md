# rollup-plugin-shader

Convert GLSL files to ES6 modules:

```glsl
// shader-vertex.glsl
attribute vec3 position;
uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
void main(void) {
    gl_Position = uPMatrix * uMVMatrix * vec4(position, 1.0);
}
```

```javascript
// import a glsl file
import vertex from './shader-vertex.glsl';
console.log( typeof vertex );   // string
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
    input: 'src/main.js',
    output: {
        file: 'dist/bundle.js',
        format: 'cjs'
    },
    plugins: [
        shader( {
            // All match files will be parsed by default,
            // but you can also specifically include/exclude files
            include: '**/*.glsl',   // default: [ '**/*.glsl', '**/*.vs', '**/*.fs' ]
            exclude: [ 'node_modules/foo/**', 'node_modules/bar/**' ],

            // specify whether to remove comments
            removeComments: true,   // default: true
        } )
    ]
};
```

## License
MIT
