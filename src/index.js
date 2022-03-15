import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import { Web3ReactProvider } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import { ChakraProvider } from '@chakra-ui/react';

function getLibrary(provider, connector) {
  return new Web3Provider(provider);
}

ReactDOM.render(
  <Web3ReactProvider getLibrary={getLibrary}>
    <ChakraProvider>
      {' '}
      <App />
    </ChakraProvider>
  </Web3ReactProvider>,
  document.getElementById('root')
);
