import { Card, CardFooter, Center, Container, Input, Text } from "@chakra-ui/react";
import { Web3Button, useContract } from "@thirdweb-dev/react";
import { useState } from "react";
import { MARKETPLACE_ADDRESS, BH_ADDRESS } from "../const/addresses";
import { ethers } from "ethers";
import MyListings from "./MyListings";

export default function Sell() {
    const [amountToSell, setAmountToSell] = useState(0);
    const [price, setPrice] = useState(0);

    const { contract: BH } = useContract(BH_ADDRESS);

    return (
        <>
            <Container>
                <Card p={4} margin={10} alignContent={'center'} backgroundColor={"blackAlpha.600"} color={"white"}>
                    <Center>
                        <Text fontSize={'xl'} fontWeight={'bold'}>Sell BH Tokens</Text>
                    </Center>
                    <Text>Amount:</Text>
                    <Input
                        type="number"
                        onChange={(e) => setAmountToSell(e.target.value)}
                    />
                    <Text>Price:</Text>
                    <Input
                        type="number"
                        onChange={(e) => setPrice(e.target.value)}
                    />
                    <CardFooter justifyContent={'center'}>
                        <Web3Button
                            contractAddress={MARKETPLACE_ADDRESS}
                            action={async (contract) =>{
                                await BH?.call(
                                    "approve",
                                    [MARKETPLACE_ADDRESS, ethers.utils.parseEther(amountToSell)]
                                )

                                await contract.call(
                                    "addListing",
                                    [price, amountToSell]
                                )
                            }}
                        >
                            Sell
                        </Web3Button>
                    </CardFooter>
                </Card>
            </Container>
            <MyListings/>
        </>
    )
}