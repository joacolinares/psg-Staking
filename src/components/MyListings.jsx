import { useAddress, useContract, useContractRead, Web3Button } from "@thirdweb-dev/react";
import { Card, CardBody, Box, Center, Container, Heading, SimpleGrid, Spinner, Text, CardFooter, Image} from "@chakra-ui/react";
import { MARKETPLACE_ADDRESS } from "../const/addresses";
import { ethers } from "ethers";
import COIN from "../assets/coin.png";

export default function MyListings() {
    const address = useAddress()

    const { contract: marketplaceContract } = useContract(MARKETPLACE_ADDRESS);

    const { data, isLoading } = useContractRead(marketplaceContract, "getListingsByOwner", [address])

    return (
        <>
            <Box justifyContent={'center'} alignContent={'center'}>
                <Center>
                    <Heading>My Listings</Heading>
                </Center>
                {isLoading ? (
                    <Center color={"white"} pt={100}>
                        <Spinner/>
                    </Center>
                ) : (
                    <SimpleGrid columns={{ sm: 1, md: 3 }} justifyItems={"center"} spacing={5} p={50}>
                        {data.map((value, index) => (
                            <Card key={index} w={"220px"} borderRadius={"lg"} backgroundColor={"blackAlpha.600"} color={"white"}>
                                <CardBody>
                                <Image src={COIN} borderRadius="lg" p={6}/>
                                    <Container>
                                        <Text fontWeight={"bold"}>Owner: {value.owner.toString().slice(0, 4)}..{value.owner.toString().slice(-3)}</Text>
                                        <Text fontWeight={"bold"}>Amount: {ethers.utils.formatEther(value.amount.toString())} BH</Text>
                                        <Text fontWeight={"bold"}>Price: {ethers.utils.formatEther(value.price.toString())} USDT</Text>
                                    </Container>
                                </CardBody>
                                <CardFooter display={"flex"} justifyContent={"center"}>
                                    <Web3Button
                                        contractAddress={MARKETPLACE_ADDRESS}
                                        action={async (contract) => {
                                            await contract.call("removeListing", [value.id])
                                        }}
                                    >
                                        Remove
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