import {
    createFilter
} from 'rollup-pluginutils';

function glsl( {
	include = [ '*.glsl', '*.vs', '*.fs' ],
	exclude,
	removeComments = true
} ) {

    const filter = createFilter( include, exclude );

    return {

        transform( code, id ) {

            if ( !filter( id ) ) return;

			if ( removeComments ) {
				code = code
						.replace( /[ \t]*\/\/.*\n/g, '' ) // remove //
						.replace( /[ \t]*\/\*[\s\S]*?\*\//g, '' ) // remove /* */
						.replace( /\n{2,}/g, '\n' ) // # \n+ to \n
			}

			const transformedCode = `export default ${ JSON.stringify( code ) };`;

            return {
                code: transformedCode,
                map: {
                    mappings: ''
                }
            };

        }

    };

}

export default glsl;
