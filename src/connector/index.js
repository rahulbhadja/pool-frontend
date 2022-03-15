import { InjectedConnector } from '@web3-react/injected-connector';

const SUPPORTED_CHAIN_IDS = [1, 4, 3, 42, 5, 56, 97, 137, 80001, 56, 97, 1337];

//metamask
export const injected = new InjectedConnector({
  supportedChainIds: SUPPORTED_CHAIN_IDS,
});
