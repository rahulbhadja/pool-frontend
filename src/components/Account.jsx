import React, { useEffect } from 'react';
import { useWeb3React } from '@web3-react/core';
import { injected } from '../connector';
import { Alert, Box, Button, Center, Heading } from '@chakra-ui/react';
import { ethers } from 'ethers';

const Account = () => {
  const { active, account, library, connector, activate, deactivate, chainId } =
    useWeb3React();

  const ACCOUNT_KEY = 'LAST_ACTIVE_ACCOUNT';
  const CONNECTOR_KEY = 'LAST_WALLET_CONNECTOR';

  const setLastActiveAccount = (account) => {
    localStorage?.setItem(ACCOUNT_KEY, account);
  };

  const getLastActiveAccount = () => {
    return localStorage?.getItem(ACCOUNT_KEY);
  };

  const setLastConnector = (connector) => {
    localStorage?.setItem(CONNECTOR_KEY, connector);
  };

  const getLastConnector = () => {
    return localStorage?.getItem(CONNECTOR_KEY);
  };

  useEffect(() => {
    const lastConnector = getLastConnector();
    const lastActiveAccount = getLastActiveAccount();

    if (lastActiveAccount && lastConnector) {
      activate(injected);
    }

    //eslint-disable-next-line
  }, []);

  return (
    <Center
      alignContent={'center'}
      flexDirection='column'
      gap={'3'}
      justifyContent='center'
    >
      {account && <Heading size={'md'}>Account</Heading>}
      <Button
        width={'250px'}
        height={'60px'}
        variant={'solid'}
        colorScheme='messenger'
        size={'lg'}
        onClick={async () => {
          if (window.ethereum === undefined) {
            alert('Please install metamask');
          }
          const provider = new ethers.providers.Web3Provider(
            window.ethereum,
            'any'
          );
          // Prompt user for account connections
          await provider.send('eth_requestAccounts', []);
          const signer = provider.getSigner();
          const last = await signer.getAddress();
          setLastConnector(last);
          activate(injected);

          setLastActiveAccount(last);

          await activate(injected);
          //   if (active) {
          //     deactivate();
          //   }
        }}
      >
        {active
          ? `${account.slice(0, 4)}...${account.slice(-4)}`
          : 'Connect Wallet'}
      </Button>
    </Center>
  );
};
export default Account;
