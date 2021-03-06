import { Contract } from 'ethers';
import React, { useEffect, useState } from 'react';
import { useWeb3React } from '@web3-react/core';

import poolContract from '../config/PoolContract.json';
import { formatEther, parseEther } from 'ethers/lib/utils';
import { Button, Center, Flex, Heading } from '@chakra-ui/react';

const poolAddress = '0xfDA1cF6261DcAbAa29b3e464f78717FFb54b8A63';

const Pool = () => {
  const { active, account, library, chainId } = useWeb3React();

  const [balance, setBalance] = useState('');
  const [earnedBalance, setEarnedBalance] = useState('');
  const [loadingClaim, setLoadingCaim] = useState();
  const [loadingDeposit, setLoadingDeposit] = useState();
  const [loadingWithdraw, setLoadingWithdraw] = useState();
  const [ethBalance, setEthBalance] = useState('');
  async function fetchBalance() {
    try {
      if (active) {
        const contract = new Contract(
          poolAddress,
          poolContract.abi,
          library.getSigner()
        );

        const totalShares = await contract.contractBalance();
        console.log('totalShares ', totalShares.toString());
        const newTotalShares = parseFloat(formatEther(totalShares)).toFixed(4);
        setBalance(newTotalShares);
      }
    } catch (error) {
      console.log(error);
    }
  }
  const getBalance = async () => {
    if (active) {
      try {
        const balance = await library.getBalance(account);
        const newbalance = parseFloat(formatEther(balance)).toFixed(4);
        setEthBalance(newbalance);
      } catch (error) {
        console.log(error);
      }
    }
  };

  async function getEarnedBalance() {
    try {
      if (active) {
        const contract = new Contract(
          poolAddress,
          poolContract.abi,
          library.getSigner()
        );

        const earnedBalance = await contract.totalEarnedTokens(account);
        console.log('earnedBalance ', earnedBalance.toString());
        const newBalance = formatEther(earnedBalance);
        setEarnedBalance(newBalance);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const claim = async () => {
    if (active) {
      setLoadingCaim(true);
      try {
        const contract = new Contract(
          poolAddress,
          poolContract.abi,
          library.getSigner()
        );
        const claimdata = await contract.claim();
        await claimdata.wait();
        fetchBalance();
      } catch (error) {
        console.log(error);
      }
      setLoadingCaim(false);
    }
  };
  const withdraw = async () => {
    if (active) {
      setLoadingWithdraw(true);
      const v = prompt('please enter amount to withdraw');

      try {
        const contract = new Contract(
          poolAddress,
          poolContract.abi,
          library.getSigner()
        );
        const claimdata = await contract.withdraw(parseEther(v));
        await claimdata.wait();
        fetchBalance();
      } catch (error) {
        console.log(error);
      }
      setLoadingWithdraw(false);
    }
  };

  const deposit = async () => {
    if (active) {
      const v = prompt('please enter amount to deposit');
      setLoadingDeposit(true);

      try {
        const contract = new Contract(
          poolAddress,
          poolContract.abi,
          library.getSigner()
        );
        const claimdata = await contract.deposit(parseEther(v));

        await claimdata.wait();
      } catch (error) {
        console.log(error);
      }
      setLoadingDeposit(false);
    }
  };

  useEffect(() => {
    fetchBalance();
    getEarnedBalance();
    getBalance();
  }, [account, chainId]);

  return (
    <Center>
      {' '}
      {account ? (
        <Flex direction={'column'} alignItems='center' margin={'20'} gap='2'>
          <Heading>Pool Farming Details</Heading>
          <Heading size={'md'}>{` Total ETH :${ethBalance}`}</Heading>
          <Heading size={'md'}>{` Total Pool Balance :${balance}`}</Heading>
          <Heading
            size={'md'}
          >{` Total Earned Balance :${earnedBalance}`}</Heading>
          <Flex direction={'column'} alignItems='center' margin={'5'} gap='2'>
            <Button
              loadingText={'please wait'}
              isLoading={loadingDeposit}
              onClick={deposit}
              width={'160px'}
              variant={'solid'}
              colorScheme='telegram'
              size={'lg'}
            >
              Stake
            </Button>
            <Button
              loadingText={'please wait'}
              isLoading={loadingWithdraw}
              onClick={withdraw}
              width={'160px'}
              variant={'solid'}
              colorScheme='telegram'
              size={'lg'}
            >
              Withdraw
            </Button>
            <Button
              loadingText={'please wait'}
              isLoading={loadingClaim}
              onClick={claim}
              width={'160px'}
              variant={'solid'}
              colorScheme='telegram'
              size={'lg'}
            >
              Claim
            </Button>
          </Flex>
        </Flex>
      ) : (
        <Heading>Please Connect to the wallet first !!!</Heading>
      )}
    </Center>
  );
};

export default Pool;
