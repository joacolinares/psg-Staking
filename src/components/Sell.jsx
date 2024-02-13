import { Card, CardFooter, Center, Container, Input, Text } from "@chakra-ui/react";
import { Web3Button, useAddress, useContract } from "@thirdweb-dev/react";
import { useState } from "react";
import { MARKETPLACE_ADDRESS, BH_ADDRESS } from "../const/addresses";
import { ethers } from "ethers";
import abi from '../abis/abi.json'
import tokenAbi from '../abis/tokenAbi.json'
export default function Sell() {
    const [amountToStake, setAmountToStake] = useState(0);
    const [reward, setReward] = useState(0)
    const [verReward, setVerReward] = useState(false)
    const { contract: BH } = useContract();
    const wallet = useAddress()
    return (
        <>
            <Container>
                <Card p={4} margin={10} alignContent={'center'} backgroundColor={"blackAlpha.600"} color={"white"}>
                    <Center>
                        <Text fontSize={'xl'} fontWeight={'bold'}>Staking</Text>
                    </Center>
                    <Text>Amount:</Text>
                    <Input
                        type="number"
                        onChange={(e) => setAmountToStake(e.target.value)}
                    />
                    <CardFooter justifyContent={'center'}>
                      
                    <Web3Button
                            contractAddress={"0x7334Ed7F196986bB834Ed389C2743a70b6857487"}
                            contractAbi={tokenAbi}
                            action={async (contract) =>{
                                await contract?.call(
                                    "approve",
                                    ["0xbF4BFa59CeB2278F30C2260e3ED3647D47Cf5132",100]
                                )
                            }}
                        >
                            Aprobar
                        </Web3Button>
                        <br />
                        <Web3Button
                            contractAddress={"0xbF4BFa59CeB2278F30C2260e3ED3647D47Cf5132"}
                            contractAbi={abi}
                            action={async (contract) =>{
                                await contract?.call(
                                    "stake",
                                    [amountToStake]
                                )
                            }}
                        >
                            Stake
                        </Web3Button>
                    </CardFooter>


                    <CardFooter justifyContent={'center'}>
                      
                      <Web3Button
                              contractAddress={"0xbF4BFa59CeB2278F30C2260e3ED3647D47Cf5132"}
                              contractAbi={abi}
                              action={async (contract) =>{
                                  await contract?.call(
                                      "claim",
                                      []
                                  )
                              }}
                          >
                              Reclamar ganancias
                          </Web3Button>
                  
                        
                      </CardFooter>

                    <CardFooter justifyContent={'center'}>
                      
                      <Web3Button
                              contractAddress={"0xbF4BFa59CeB2278F30C2260e3ED3647D47Cf5132"}
                              contractAbi={abi}
                              action={async (contract) =>{
                                  await contract?.call(
                                      "unstake",
                                      []
                                  )
                              }}
                          >
                              Retirar
                          </Web3Button>
                  
                        
                      </CardFooter>
                    <Web3Button
                            contractAddress={"0xbF4BFa59CeB2278F30C2260e3ED3647D47Cf5132"}
                            contractAbi={abi}
                            action={async (contract) =>{
                             const rewardTotal =    await contract?.call(
                                    "calculateReward",
                                    [wallet]
                                )
                                console.log(rewardTotal)
                                const rewardNumero = parseInt(rewardTotal._hex, 16)
                              const final = rewardNumero /1000000000000000000
                            console.log(final)
                                setReward(final)
                                setVerReward(true)
                            }}
                        >
                           Ver Ganancias
                        </Web3Button>
                        {verReward
                            &&
                            <>
                          <center> Ganancias: {reward}</center> 
                            </>
                            }
                        
                </Card>
            </Container>
        </>
    )
}