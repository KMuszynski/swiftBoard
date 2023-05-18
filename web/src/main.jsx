import React from 'react'

import {ChakraProvider, ColorModeScript} from '@chakra-ui/react'
import ReactDOM from 'react-dom/client'
import {Provider} from 'react-redux'
import {BrowserRouter} from 'react-router-dom'

import App from './App.jsx'
import './index.css'
import {store} from './store'
import theme, {ToastContainer} from './theme'
import Fonts from './theme/foundations/fonts'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <ChakraProvider theme={theme} toastOptions={{defaultOptions: {isClosable: true}}}>
        <Fonts />
        <ToastContainer />
        <Provider store={store}>
          <App />
        </Provider>
      </ChakraProvider>
    </BrowserRouter>
  </React.StrictMode>
)
