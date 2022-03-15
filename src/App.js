import { Box, Flex } from '@chakra-ui/react';
import Account from './components/Account';
import Pool from './components/Pool';

function App() {
  return (
    <Flex direction={'column'} marginTop={'20'}>
      <Account />
      <Pool />
    </Flex>
  );
}

export default App;
