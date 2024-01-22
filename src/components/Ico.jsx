import { Web3Button, useAddress, useContract, useContractRead } from "@thirdweb-dev/react";
import { Card, Text, Input, Container } from '@chakra-ui/react';
import { useState } from "react";
import { USDT_ADDRESS, ICO_ADDRESS } from "../const/addresses";
import { ethers } from "ethers";
import Balances from "./Balances";

export default function Buy() {
    const address = useAddress();

    const { contract: USDT, isLoading: loadingUSDT } = useContract(USDT_ADDRESS);

    const { contract: icoContract } = useContract(ICO_ADDRESS);

    const { data: claimableBalance } = useContractRead(icoContract, "balances", [address]);

    const [amountToBuy, setAmountToBuy] = useState(0);

    return (
        <Container justifyContent={"center"} height={"100vh"} py={50} px={10}>
            <Balances/>
            <Card p={4} margin={10} maxW={'sm'} alignContent={'center'} backgroundColor={"blackAlpha.600"} color={"white"}>
                <Text fontWeight={'bold'}>Round 1 Online</Text>
                <Text fontWeight={'bold'}>Price per Token: 0.04 USDT</Text>
                <Input
                    marginTop={5}
                    marginBottom={5}
                    type="number"
                    value={amountToBuy}
                    onChange={(e) => setAmountToBuy(e.target.value)}
                />
                <Web3Button
                    theme={'dark'}
                    contractAddress={ICO_ADDRESS}
                    action={async (contract) => {
                        await USDT?.call(
                            "approve",
                            [ICO_ADDRESS, ethers.utils.parseEther(amountToBuy)]
                        )

                        await contract.call(
                            "buyRound1",
                            [amountToBuy]
                        )
                    }}
                >
                    Buy
                </Web3Button>
            </Card>
            <Card p={4} margin={10} maxW={'sm'} alignContent={'center'} backgroundColor={"blackAlpha.600"} color={"white"}>
                <Text fontWeight={'bold'}>Avaliable BH to claim: {claimableBalance ? claimableBalance.toString() : "0"}</Text>
                <Web3Button
                    contractAddress={ICO_ADDRESS}
                    action={async (contract) => {
                        await contract.call("claimTokens")
                    }}
                >Claim</Web3Button>
            </Card>
        </Container>
    )
}