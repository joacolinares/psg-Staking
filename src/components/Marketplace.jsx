import { useContract, useContractRead, Web3Button } from "@thirdweb-dev/react";
import { Card, Center, SimpleGrid, Spinner, Text, Box, Heading, CardBody, Container, CardFooter } from "@chakra-ui/react";
import { MARKETPLACE_ADDRESS, USDT_ADDRESS } from "../const/addresses";
import { ethers } from "ethers";

export default function Marketplace() {
    const { contract: marketplaceContract } = useContract(MARKETPLACE_ADDRESS);

    const { data, isLoading } = useContractRead(marketplaceContract, "getListings");

    const { contract: USDT, isLoading: loadingUSDT } = useContract(USDT_ADDRESS);

    return (
        <>
            <Box justifyContent={'center'} alignContent={'center'}>
                <Center>
                    <Heading>Marketplace</Heading>
                </Center>
                {isLoading ? (
                    <Center color={"white"} pt={100}>
                        <Spinner/>
                    </Center>
                ) : (
                    <SimpleGrid columns={{ sm: 1, md: 3 }} justifyItems={"center"} spacing={5} p={50}>
                        {data.map((value, index) => (
                            <Card key={index} maxW={"400px"} borderRadius={"lg"} backgroundColor={"blackAlpha.600"} color={"white"}>
                                <CardBody>
                                    <Container>
                                        <Text>Owner: {value.owner.toString().slice(0, 4)}..{value.owner.toString().slice(-3)}</Text>
                                        <Text>Amount: {ethers.utils.formatEther(value.amount.toString())} BH</Text>
                                        <Text>Price: {ethers.utils.formatEther(value.price.toString())} USDT</Text>
                                    </Container>
                                </CardBody>
                                <CardFooter display={"flex"} justifyContent={"center"}>
                                    <Web3Button
                                        contractAddress={MARKETPLACE_ADDRESS}
                                        action={async (contract) => {
                                            await USDT?.call(
                                                "approve",
                                                [MARKETPLACE_ADDRESS, value.price.toString()]
                                            )

                                            await contract.call("buy", [value.id])
                                        }}
                                    >
                                        Buy
                                    </Web3Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </SimpleGrid>
                )}
            </Box>
        </>
    )
}