import React from 'react'
import ReactDOM from 'react-dom/client'
import { ChakraProvider } from '@chakra-ui/react'
import Routes from './routes/Routes.tsx'
import tema from './theme/temas.ts'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ChakraProvider theme={tema}>
      <Routes/>
    </ChakraProvider>
  </React.StrictMode>,
)
