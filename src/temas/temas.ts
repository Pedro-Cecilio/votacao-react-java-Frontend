import { extendTheme } from '@chakra-ui/react';

const tema = extendTheme({
    colors: {
        cinza: {
            50: '#f7fafc',
            100: '#edf2f7',
            200: '#e2e8f0',
            300: '#cbd5e0',
            400: '#a0aec0',
            500: '#718096',
            600: '#4a5568',
            700: '#2d3748',
            800: '#1a202c',
            900: '#171923',
        },
        preto: '#000000',
        branco: '#ffffff',

        vermelho: '#e53e3e',
        laranja: '#ed8936',
        amarelo: '#ecc94b',
        verde: '#48bb78',
        teal: '#38b2ac',
        azul: '#4299e1',
        índigo: '#667eea',
        roxo: '#9f7aea',
        rosa: '#ed64a6',
    },
});

export default tema;
