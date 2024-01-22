import { useAddress, useContract, useTokenBalance } from "@thirdweb-dev/react"
import { BH_ADDRESS, USDT_ADDRESS } from "../const/addresses";
import { SimpleGrid, Card, Text } from '@chakra-ui/react';

export default function Balances() {
    const address = useAddress();

    const { contract: BH, isLoading: loadingBH } = useContract(BH_ADDRESS);

    const { contract: USDT, isLoading: loadingUSDT } = useContract(USDT_ADDRESS);

    const { data: BHbalance, isLoading: loadingBHbalance } = useTokenBalance(BH, address);

    const { data: USDTbalance, isLoading: loadingUSDTbalance } = useTokenBalance(USDT, address);

    return (
        <SimpleGrid columns={{ sm: 1, md: 2 }}>
            <Card p={4} margin={8} alignContent={"center"} backgroundColor={"blackAlpha.600"} color={"white"}>
                <Text fontSize={'large'} fontWeight={"bold"} >BH Balance: </Text>
                <Text>{BHbalance ? BHbalance.displayValue : "0"}</Text>
            </Card>
            <Card p={4} margin={8} alignContent={"center"} backgroundColor={"blackAlpha.600"} color={"white"}>
                <Text fontSize={'large'} fontWeight={"bold"} >USDT Balance: </Text>
                <Text>{USDTbalance ? USDTbalance.displayValue : "0"}</Text>
            </Card>
        </SimpleGrid>
    )
}