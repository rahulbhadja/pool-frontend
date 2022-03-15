import React from 'react';
import { useWeb3React } from '@web3-react/core';
import { injected } from '../connector';
import { Alert, Box, Button, Center } from '@chakra-ui/react';

const Account = () => {
  const { active, account, library, connector, activate, deactivate, chainId } =
    useWeb3React();

  return (
    <Center alignContent={'center'}>
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
