const rollup = require( 'rollup' );
const shader = require( '..' );


function bundle( input, pluginOptions = {}, generateOptions = {}, rollupOptions = {} ) {
    input = require.resolve( input );
    return rollup.rollup( Object.assign( {
        input,
        plugins: [ shader( pluginOptions ) ],
    }, rollupOptions ) ).then( bundle => {
        return bundle.generate( Object.assign( {
            format: 'es'
        }, generateOptions ) );
    } );
}


test( 'import GLSL files', async () => {

    let result, code;

    result = await bundle( './samples/simple-fragment.glsl' );
    code = result.code;
    expect( code.indexOf( 'gl_FragColor' ) ).not.toBe( -1 );

    result = await bundle( './samples/simple.vs' );
    code = result.code;
    expect( code.indexOf( 'gl_Position' ) ).not.toBe( -1 );

    result = await bundle( './samples/simple.fs' );
    code = result.code;
    expect( code.indexOf( 'gl_FragColor' ) ).not.toBe( -1 );

} )

test( 'options - removeComments', async () => {

    let code, result;

    result = await bundle( './samples/simple-fragment.glsl', {
        removeComments: false
    } );
    code = result.code;

    expect( code.indexOf( 'comments' ) ).not.toBe( -1 );
    expect( code.indexOf( 'comments' ) ).not.toBe( -1 );
    expect( code.indexOf( '//' ) ).not.toBe( -1 );
    expect( code.indexOf( '/*' ) ).not.toBe( -1 );

    result = await bundle( './samples/simple-fragment.glsl', {
        removeComments: true
    } );
    code = result.code;

    expect( code.indexOf( 'comments' ) ).toBe( -1 );
    expect( code.indexOf( 'comments' ) ).toBe( -1 );
    expect( code.indexOf( '//' ) ).toBe( -1 );
    expect( code.indexOf( '/*' ) ).toBe( -1 );

} )
