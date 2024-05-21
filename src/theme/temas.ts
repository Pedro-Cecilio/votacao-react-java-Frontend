import { extendTheme } from '@chakra-ui/react';

const tema = extendTheme({
    colors: {
        cinza: {
            100: '#edf2f7',
            300: '#cbd5e0',
            400: '#a0aec0',
            500: '#718096',
            700: '#2d3748',
            800: '#1a202c',
        },
        preto: '#000000',
        branco: '#ffffff',
    },
});

export default tema;
