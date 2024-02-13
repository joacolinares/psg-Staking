import {Container, Flex, Image, HStack, IconButton, useDisclosure, Stack, Text } from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import LOGO from '../assets/logo.png';

import { ConnectWallet } from '@thirdweb-dev/react';
import { Link, Outlet } from 'react-router-dom';
import logoFinal from '../../src/logo.jpeg'
export default function NavBar() {
  
    const { isOpen, onOpen, onClose } = useDisclosure();
  
    return (
      <>
        <Container py={4} maxW={"1200px"}>
            <Flex direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
                <HStack spacing={8} alignItems={'center'}>
                
                <Image w={40} borderRadius={100} src={logoFinal}></Image>
            </HStack>
          
            <IconButton
              size={'md'}
              icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
              aria-label={'Open Menu'}
              display={{ md: 'none' }}
              onClick={isOpen ? onClose : onOpen}
            />
          </Flex>
  
          {isOpen ? (
            <Container p={5} display={{ md: 'none' }} backgroundColor={"blackAlpha.700"}>
                <Stack as={'nav'} spacing={4}>
                    <Link to={"/"}>
                        <Text fontSize={"lg"} fontWeight={"semibold"} color={"white"}>ICO</Text>
                    </Link>
                    <Link to={"/sell"}>
                        <Text fontSize={"lg"} fontWeight={"semibold"} color={"white"}>Sell BH</Text>
                    </Link>
                    <Link to={"/marketplace"}>
                        <Text fontSize={"lg"} fontWeight={"semibold"} color={"white"}>Marketplace</Text>
                    </Link>
                    <Link to={"/swap"}>
                        <Text fontSize={"lg"} fontWeight={"semibold"} color={"white"}>Swap</Text>
                    </Link>
                    <Link to={"/stake"}>
                        <Text fontSize={"lg"} fontWeight={"semibold"} color={"white"}>Stake</Text>
                    </Link>
                </Stack>
                <Flex alignItems={'center'} justifyContent={"center"} mt={4}>
                    <ConnectWallet/>
                </Flex>
            </Container>
          ) : null}
          <Outlet/>
        </Container>
      </>
    );
}