import { useState } from 'react'; // Importa useState
import { useContract, useContractRead, Web3Button } from "@thirdweb-dev/react";
import { Card, Center, SimpleGrid, Spinner, Text, Box, Heading, CardBody, Container, CardFooter } from "@chakra-ui/react";
import { MARKETPLACE_ADDRESS, USDT_ADDRESS } from "../const/addresses";
import { ethers } from "ethers";

export default function Marketplace() {
    const { contract: marketplaceContract } = useContract(MARKETPLACE_ADDRESS);
    const { data, isLoading } = useContractRead(marketplaceContract, "getListings");
    const { contract: USDT, isLoading: loadingUSDT } = useContract(USDT_ADDRESS);
    
    const [sorted, setSorted] = useState(false); // Estado para controlar si los datos están ordenados
    const [sortAsc, setSortAsc] = useState(true); // Estado para el orden ascendente/descendente
    const [sorted2, setSorted2] = useState(false); // Estado para controlar si los datos están ordenados
    const [sortAsc2, setSortAsc2] = useState(true); // Estado para el orden ascendente/descendente

    // Función para ordenar las listas según el precio
    const sortedData = sorted
    ? sorted2
        ? [...data].sort((a, b) => {
            const fieldA = ethers.BigNumber.from(a.amount);
            const fieldB = ethers.BigNumber.from(b.amount);
            return sortAsc2 ? fieldA.sub(fieldB) : fieldB.sub(fieldA);
        })
        : [...data].sort((a, b) => {
            const priceA = ethers.BigNumber.from(a.price);
            const priceB = ethers.BigNumber.from(b.price);
            return sortAsc ? priceA.sub(priceB) : priceB.sub(priceA);
        })
    : data;


    const changeOrder = () =>{
        setSorted(true);
        setSorted2(false);
        setSortAsc(!sortAsc)
       /* if (Array.isArray(data) && data.length > 0) {
            sortedData = [...data].sort((a, b) => {
                const priceA = ethers.BigNumber.from(a.price);
                const priceB = ethers.BigNumber.from(b.price);
                
                if (sortAsc) {
                    return priceA.lt(priceB) ? -1 : 1;
                } else {
                    return priceA.gt(priceB) ? -1 : 1;
                }
            });
        }*/
    }

    const changeOrder2 = () =>{
        setSorted(false);
        setSorted2(true);
        setSortAsc2(!sortAsc2)
       /* if (Array.isArray(data) && data.length > 0) {
            sortedData = [...data].sort((a, b) => {
                const amountA = ethers.BigNumber.from(a.amount);
                const priceB = ethers.BigNumber.from(b.amount);
                if (sortAsc2) {
                    return priceA.lt(priceB) ? -1 : 1;
                } else {
                    return priceA.gt(priceB) ? -1 : 1;
                }
            });
        }*/
    }

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
                    <>
                        <Center>
                            <button onClick={changeOrder}>
                                {sortAsc ? "Precio: ⬆️" : "Precio: ⬇️"}
                            </button>
                            <button style={{marginLeft:"15px"}} onClick={changeOrder2}>
                                {sortAsc2 ? "Cantidad: ⬆️" : "Cantidad: ⬇️"}
                            </button>
                        </Center>
                        <SimpleGrid columns={{ sm: 1, md: 3 }} justifyItems={"center"} spacing={5} p={50}>
                            {sortedData.map((value, index) => (
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
                    </>
                )}
            </Box>
        </>
    )
}
