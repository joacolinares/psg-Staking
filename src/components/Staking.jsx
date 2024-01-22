import { Card, CardBody, Box, Center, Container, Heading, Input, SimpleGrid, Spinner, Text, VStack, CardFooter, ButtonGroup } from "@chakra-ui/react";
import { Web3Button, useAddress, useContract, useContractRead } from "@thirdweb-dev/react";
import { BH_ADDRESS, STAKING_ADDRESS } from "../const/addresses";
import { ethers } from "ethers";
import { useState, useEffect } from "react";

export default function Staking() {
    const address = useAddress();

    const { contract: BH, isLoading: loadingBH } = useContract(BH_ADDRESS);
    const { contract: stakingContract } = useContract(STAKING_ADDRESS);

    const { data, isLoading } = useContractRead(stakingContract, "getStakingsPerAddress", [address])

    const [amountToStake, setAmountToStake] = useState(0);
    const [rewards, setRewards] = useState([]);

    const getRewards = async (index) => {
        const rewards = await stakingContract.call("calculateRewards", [address, index])
        let rewardsFinal = ethers.utils.formatEther(rewards);
        return rewardsFinal
    }

    useEffect(() => {
        if (data && data.length > 0) {
            const fetchRewards = async () => {
                const rewardsPromises = data.map((_, index) => getRewards(index));
                const results = await Promise.all(rewardsPromises);
                setRewards(results);
            };
            fetchRewards();
            console.log(data)
        }
    }, [data]);

    return (
        <>
            <Container justifyContent={"center"} py={50} px={10}>
                <Card maxW={"400px"} p={4} margin={10} alignContent={'center'} backgroundColor={"blackAlpha.600"} color={"white"}>
                    <CardBody>
                        <Text fontSize={'xl'} fontWeight={"bold"}>Stake</Text>
                        <Text fontSize={'xl'}>APY: 5%</Text>
                    </CardBody>
                    <Input 
                        type="number"
                        placeholder="Amount"
                        onChange={(e) => setAmountToStake(e.target.value)}/>
                    <Web3Button
                        contractAddress={STAKING_ADDRESS}
                        action={async (contract) => {
                            await BH?.call(
                                "approve",
                            [STAKING_ADDRESS, ethers.utils.parseEther(amountToStake)]
                            )

                            await contract.call(
                                "stake",
                                [amountToStake]
                            )
                        }}
                    >Stake</Web3Button>
                </Card>
            </Container>
            <Box justifyContent={'center'} alignContent={'center'}>
                <Center>
                    <Heading>My Stakings</Heading>
                </Center>
            {isLoading ? (
                <Center color={"black"} pt={100}>
                    <Spinner/>
                </Center>
            ) : (
                <SimpleGrid columns={{ sm: 1, md: 3 }} justifyItems={"center"} spacing={5} p={50}>
                    {data.map((value, index) => (
                        <Card key={index} maxW={"400px"} borderRadius={"lg"} backgroundColor={"blackAlpha.600"} color={"white"}>
                            <CardBody>
                                <Container>
                                    <Text>My Stake {index + 1}</Text>
                                    <Text>Amount staked: {value.amount.toString()}</Text>
                                    <Text>Avaliable to Claim: {parseFloat(rewards[index]).toFixed(4)}</Text>
                                </Container>
                            </CardBody>
                            <CardFooter display={"flex"}>
                                <ButtonGroup gap={1}>
                                    <Web3Button
                                        contractAddress={STAKING_ADDRESS}
                                        action={async (contract) => {
                                            await contract.call("claimRewards", [index])
                                        }}
                                    >
                                        Claim Rewards
                                    </Web3Button>
                                    <Web3Button
                                        contractAddress={STAKING_ADDRESS}
                                        action={async (contract) => {
                                            await contract.call("unstake", [index])
                                        }}
                                    >
                                        Unstake
                                    </Web3Button>
                                </ButtonGroup>
                            </CardFooter>
                        </Card>
                    ))}
                </SimpleGrid>
            )}
        </Box>
    </>
    )
}